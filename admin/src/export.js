/* eslint-disable no-plusplus */
const axios = require("axios")
const config = require("config")

let holdingsCompanies = []

/**
 * Calculates the holding value
 * @param {*} investmentTotal total investment
 * @param {*} investmentPercentage percentage investment
 * @returns holding value
 */
const getHoldingValue = (investmentTotal, investmentPercentage) => {
  return investmentTotal * (investmentPercentage / 100)
}

/**
 * Find the company with the specified id
 * @param {*} companies all holding companies
 * @param {*} id id of holding company requested
 * @returns company with the specified id
 */
const getHoldingCompany = (companies, id) => {
  return companies.find(company => company.id === id)
}

/**
 * Convert holdings to required format
 * @param {*} holdings details of each of the holdings
 * @param {*} investmentTotal total investment for holding
 * @returns holding company and value for each holding
 */
const processHoldings = (holdings, investmentTotal) => {
  return holdings.map(holding => {
    return {
      holdingCompany: getHoldingCompany(holdingsCompanies, holding.id)?.name,
      holdingValue: getHoldingValue(investmentTotal, holding.investmentPercentage),
    }
  })
}

/**
 * Fetch holdings and companies information from APIs
 * @returns holdings
 */
const generateDataForExport = () => {
  return axios.get(`${config.financialCompaniesServiceUrl}/companies`).then(response => {
    holdingsCompanies = response.data
    return axios
      .get(`${config.investmentsServiceUrl}/investments`)
  }).then(response => {
    return response.data.map(investment => ({
      userId: investment.userId,
      firstName: investment.firstName,
      lastName: investment.lastName,
      date: investment.date,
      holdings: processHoldings(investment.holdings, investment.investmentTotal),
    }))
  }).catch(error => {
    console.error(error)
    return []
  })
}

/**
 * Duplicates holdings where more than one holding is present
 * @param {*} investments all holdings
 * @returns holdings where each one contains a single holding
 */
const duplicateRowsWithMultipleHoldings = (investments) => {
  const investmentsWithDuplicates = []

  for (const investment of investments) {
    for (let i = 0; i < investment.holdings.length; i++) {
      const singleHolding = {...investment, holdingsCompany: investment.holdings[i].holdingCompany, holdingsValue: investment.holdings[i].holdingValue}
      delete singleHolding.holdings
      investmentsWithDuplicates.push(Object.values(singleHolding))
    }
  }

  return investmentsWithDuplicates

}

/**
 * Generate csv format for all holdings
 * @returns investments in csv format
 */
const convertToCsv = async () => {
  const csvRows = []

  // Generate Header Row
  const headers = ["User", "First Name", "Last Name", "Date", "Holding", "Value"]
  csvRows.push(headers.join(","))

  // Generate Data Rows
  const investments = await generateDataForExport()
  csvRows.push(duplicateRowsWithMultipleHoldings(investments).join(","))

  return csvRows.join("/n")
}

module.exports = {
  generateDataForExport,
  getHoldingCompany,
  getHoldingValue,
  convertToCsv,
}
