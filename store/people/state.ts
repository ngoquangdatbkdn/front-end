export interface PersonContact {
  email: string
  phone: string
}

export interface PersonAddress {
  city: string
  country: string
  postalCode: string
  state: string
  street: string
}

export interface Person {
  id: number
  first_name: string
  last_name: string
  contact: PersonContact
  gender: string
  ip_address: string
  avatar: string
  address: PersonAddress
}


export interface State {
  selected: number
  people: Person[]
}

const state = (): State => ({
  selected: 1,
  people: []
})

export default state;