export interface CreateCompanyInput {
  placeUrl: string
  name: string
  address: string
  keywords: string[]
}

export interface CompanyData extends CreateCompanyInput {
  companyId: string
  category: string
  startDate?: string
  endDate?: string
  rank?: string
  blogStatus?: {
    target: number
    done: number
    missed: number
  }
  reviewStatus?: {
    target: number
    done: number
  }
  extra?: {
    openingHours?: string
    phoneNumber?: string
    parking?: string
    toilet?: string
    uniqueItems?: string
    events?: string
    selfBar?: string
    terrace?: string
    babyChair?: string
    privateRoom?: string
    seatStyle?: string
    tableSize?: string
    atmosphere?: string
    capacity?: string
    window?: string
  }
}
