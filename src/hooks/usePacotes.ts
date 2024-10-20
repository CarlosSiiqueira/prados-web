import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiPrados } from "../services/api";
import {
  IPacoteArgs,
  IPacoteResponse,
  ICreatePacoteArgs,
  ICreatePacoteResponse,
  IUpdatePacoteArgs,
  IUpdatePacoteResponse,
  IDeletePacoteResponse,
  IDataPacote,
} from "../models/pacote.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getAllPacotes = (): IPacoteResponse => {
  const { data, isLoading } = useQuery(
    [
      keys.pacotes
    ],
    async () => {
      const path = 'pacotes/findAll';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            ativo: true
          },
        });

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
};

const getPacotes = ({ page, size, nome, status, origem }: IPacoteArgs): IPacoteResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.pacotes,
      page,
      nome,
      status,
      origem
    ],
    async () => {
      const path = 'pacotes/index';

      try {
        const { data } = await apiPrados.get(path, {
          params: {
            page,
            size,
            nome,
            status,
            origem
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

const createPacotes = (
  reset: () => void,
  handleClose: () => void
): ICreatePacoteResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreatePacoteArgs) => {
      const urlPath = 'pacotes/create'

      try {
        await apiPrados.post(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.pacotes])

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

const updatePacote = (
  reset: () => void,
  handleClose: () => void
): IUpdatePacoteResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdatePacoteArgs) => {
      const urlPath = `pacotes/update/${data.id}`;

      try {
        await apiPrados.put(urlPath, data).then((data) => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.pacotes])

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

const deletePacote = (): IDeletePacoteResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `pacotes/delete/${id}`

      try {
        await apiPrados.patch(urlPath).then(function (data) {
          queryClient.invalidateQueries([keys.pacotes])

          useToastStandalone({
            title: "Excluído com sucesso!",
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

const pacotePromiseOptions = async (search: string, _loadedOptions: any, { page }: any) => {

  const path = 'pacotes/index';
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
    options: data.rows.map((item: IDataPacote) => ({
      label: item.nome,
      value: item.id
    })),
    hasMore: data.count > (page * itensPerPage),
    additional: {
      page: page + 1,
    }
  }
}

export default function usePacotes() {
  return {
    getPacotes,
    createPacotes,
    updatePacote,
    deletePacote,
    getAllPacotes,
    pacotePromiseOptions
  }
}
