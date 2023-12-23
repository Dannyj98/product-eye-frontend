import axios from "axios"

export default class Api {
  static isLoading = false
  static isLoaded = false
  static error = null

  static async get(path, params = {}) {
    this.isLoading = true
    try {
      const result = await axios.get(path, { params })
      this.isLoading = false
      this.isLoaded = true
      return { isLoaded: this.isLoaded, error: this.error, result: result }
    } catch (err) {
      return { isLoaded: this.isLoaded, error: err, result: null }
    }
  }

  static async post(path, body = {}) {
    this.isLoading = true
    try {
      const result = await axios.post(path, body)
      this.isLoading = false
      this.isLoaded = true
      return { isLoaded: this.isLoaded, error: this.error, result: result }
    } catch (err) {
      return { isLoaded: this.isLoaded, error: err, result: null }
    }
  }

  static async delete(path, params = {}) {
    this.isLoading = true
    try {
      const result = await axios.delete(path, params)
      this.isLoading = false
      this.isLoaded = true
      return { isLoaded: this.isLoaded, error: this.error, result: result }
    } catch (err) {
      return { isLoaded: this.isLoaded, error: err, result: null }
    }
  }
}
