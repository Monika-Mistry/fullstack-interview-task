/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable no-undef */
const {generateDataForExport, getHoldingCompany, getHoldingValue} = require("../export")
const mockAxios = require("axios")

jest.mock("axios")

const mockHoldingCompanies = [
  {
    id: 1,
    name: "My Company",
    address: "123 Alphabet Road",
    postcode: "AB1 2CD",
    frn: 12345,
  }, {
    id: 2,
    name: "Your Company",
    address: "11 Stranger Road",
    postcode: "ST1 1TH",
    frn: 987537,
  },
]

const mockInvestments = [
  {
    id: 1,
    userId: 1,
    firstName: "John",
    lastName: "Smith",
    investmentTotal: 100,
    date: "2022-01-01",
    holdings: [
      {
        id: 2,
        investmentPercentage: 1,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    firstName: "Jane",
    lastName: "Doe",
    investmentTotal: 3000,
    date: "2022-02-01",
    holdings: [
      {
        id: 1,
        investmentPercentage: 15,
      },
    ],
  },
]

const expectedInvestmentsResponse = [
  {
    userId: 1,
    firstName: "John",
    lastName: "Smith",
    investmentTotal: 100,
    date: "2022-01-01",
    holdings: [
      {
        holdingCompany: "YourCompany",
        holdingValue: 1,
      },
    ],
  },
  {
    userId: 2,
    firstName: "Jane",
    lastName: "Doe",
    date: "2022-02-01",
    holdings: [
      {
        holdingCompany: "My Company",
        holdingValue: 450,
      },
    ],
  },
]

describe("getHoldingCompany() test", () => {
  it("Should return holding company when exists", () => {
    expect(getHoldingCompany(mockHoldingCompanies, 1)).toMatchObject(mockHoldingCompanies[0])
  })

  it("Should return undefined when does not exist", () => {
    expect(getHoldingCompany(mockHoldingCompanies, 3)).toBeUndefined()
  })
})

describe("getHoldingValue() test", () => {
  it("Should return correct holding value", () => {
    expect(getHoldingValue(100, 5)).toEqual(5)
  })

  it("Should return correct holding value 2", () => {
    expect(getHoldingValue(50, 40)).toEqual(20)
  })
})

describe("generateDataForExport() test", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("Should return [] when Error", async () => {
    mockAxios.get.mockRejectedValueOnce(new Error("Error"))

    expect(await generateDataForExport()).toMatchObject([])
    expect(mockAxios.get).toBeCalledTimes(1)
  })

  it.skip("Should return valid response", async () => {
    mockAxios.get.mockResolvedValueOnce({data: mockHoldingCompanies}).mockResolvedValueOnce({data: mockInvestments})

    expect(await generateDataForExport()).toMatchObject(expectedInvestmentsResponse)
    expect(mockAxios.get).toBeCalledTimes(2)
  })

  
})
