import axios from "axios";

export default class CoinService {
    static async getAll(limit = 9, page = 1 ) {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'USD',
                per_page: limit,
                page: page,
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/' + id)
        return response
    }
}