export interface IContract {
  id: number
  produto_hub: number
  proposta: number
  contratoEmpresa: number
  flPermiteAdesaoImediata?: boolean
  proximoDiaUtil: string
  regulamentado: boolean
  nomeParceiro: string
  detalhesProduto?: string
  nomeComercialProduto: string
  nomeReduzidoProduto: string
  logoLink: string
  nomeClasseProduto: string
  ordemExibicao: number
  valorTabela: number
  idadeMin: number
  idadeMax: number
  percentualOuValor: string
  percentualDescontoPadrao?: number
  valorDescontoPadrao?: number
  custoEmpresa: number
  custoBeneficiario?: number
  flAtivo: boolean
  registroAnsProduto?: string
  nomeTipoContratacao?: string
  nomeAcomodacao?: string
  nomeSegmentacaoAssistencial: any
  flCoparticipacao?: boolean
  diaVigencia: number
  diaLimiteVigencia: number
  nomeAbrangencia: string
  status_contrato_benef: number
  dataInclusao: string
  dataExclusao: any
  statusContratoBenef: {
    id: number
    nomeStatusContratoBenef: string
    detalhamentoStatusContratoBenef?: string
    auxAgrupamento: string
  }
}
