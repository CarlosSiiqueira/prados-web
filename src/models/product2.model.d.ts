export interface IProductArgs {
  page: number;
  size: number;
  nome: string
}

export interface IDataProduct {
  id: string,
  nome: string,
  estoque: number,
  dataCompra?: Date | null,
  dataCadastro: Date,
  ativo: boolean,
  valor: number,
  codigoFornecedor: string,
  usuarioCadastro: string,
  Fornecedor: {
    id: string,
    nome: string,
    fantasia: string,
    cnpj: string,
    site: string | null,
    ativo: boolean,
    dataCadastro: Date,
    observacoes?: string | null,
    telefone: string | null,
    email: string,
    contato?: string | null,
    telefoneContato?: string | null,
    codigoEndereco: string,
    usuarioCadastro: string
  }
}

export interface IProductResponse {
  data: IDataProduct[];
  count: number;
  isLoading: boolean;
}

export interface IProductListResponse {
  data: IDataProduct;
  isLoading: boolean;
}


export interface ICreateProductArgs {
  nome: string;
  estoque: number
  ativo: boolean
  codigoFornecedor: string
  usuarioCadastro: string
}

export interface IUpdateProductArgs extends ICreateProductArgs {
  id: string
}

export interface ICreateProductResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateProductArgs, unknown>;
}

export interface IUpdateProductResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdateProductArgs, unknown>;
}
