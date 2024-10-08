import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";
import {
  ICreatePessoaArgs,
  ICreatePessoaResponse,
  IDeletePessoaResponse,
  IPessoa,
  IPessoaArgs,
  IPessoaResponse,
  IUpdatePessoaArgs,
  IUpdatePessoaResponse
} from "../models/pessoa.model";
import { extractNumbers } from "../utils/fieldValidation";

const getPessoas = ({ page, size, nome, status }: IPessoaArgs): IPessoaResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.pessoas,
      page,
      nome,
      status
    ],
    async () => {
      const path = 'pessoas/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            status,
            orderBy: 'nome'
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading
  };
}

const getAllPessoas = (): IPessoaResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.pessoas
    ],
    async () => {
      const path = `pessoas/findAll`;

      try {
        const { data } = await apiPrados.get(path);

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  );

  return {
    data: data || [],
    count: data?.count || 0,
    isLoading
  };
}

const createPessoa = (
  reset: () => void,
  handleClose: () => void
): ICreatePessoaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreatePessoaArgs) => {

      const urlPath = 'pessoas/create'
      data.telefone = data.telefone ? extractNumbers(data.telefone) : null
      data.telefoneWpp = data.telefoneWpp ? extractNumbers(data.telefoneWpp) : null
      data.telefoneContato = data.telefoneContato ? extractNumbers(data.telefoneContato) : null
      data.dataNascimento = data.dataNascimento ? data.dataNascimento : null
      data.cpf = extractNumbers(data.cpf) || ''

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.pessoas])

          useToastStandalone({
            title: "Cadastro concluído!",
            status: "success",
          });
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const updatePessoa = (
  reset: () => void,
  handleClose: () => void
): IUpdatePessoaResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdatePessoaArgs) => {

      const urlPath = `pessoas/update/${data.id}`;
      data.telefone = data.telefone ? extractNumbers(data.telefone) : null
      data.telefoneWpp = data.telefoneWpp ? extractNumbers(data.telefoneWpp) : null
      data.telefoneContato = data.telefoneContato ? extractNumbers(data.telefoneContato) : null
      data.dataNascimento = data.dataNascimento ? data.dataNascimento : null
      data.cpf = extractNumbers(data.cpf) || ''

      try {
        await apiPrados.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.pessoas])

          useToastStandalone({
            title: "Atualizado com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const deletePessoa = (): IDeletePessoaResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `pessoas/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.pessoas])

          useToastStandalone({
            title: "Excluída com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const pessoaPromiseOptions = async (search: string, _loadedOptions: any, { page }: any) => {
  const path = 'pessoas/index';
  const itensPerPage = 20;

  const { data } = await apiPrados.get(path, {
    params: {
      page,
      size: itensPerPage,
      nome: search,
      orderBy: 'nome'
    },
  });

  return {
    options: data.rows.map((item: IPessoa) => ({
      label: item.nome,
      value: item.id
    })),
    hasMore: data.count > (page * itensPerPage),
    additional: {
      page: page + 1,
    }
  }
}

export default function usePessoas() {
  return {
    getPessoas,
    getAllPessoas,
    createPessoa,
    updatePessoa,
    deletePessoa,
    pessoaPromiseOptions
  }
}
