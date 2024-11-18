import { ReturnCityDTO } from "src/city/dto/return-city.dto"
import { AddressEntity } from "../entities/address.entity"

export class ReturnAddressDto {
  complement: string
  numberAddress: number
  cep: string
  city?: ReturnCityDTO

  constructor(address: AddressEntity){
    this.complement = address.complement
    this.numberAddress = address.numberAddress
    this.cep = address.cep
    this.city = address.city ? new ReturnCityDTO(address.city) : undefined
  }
}
