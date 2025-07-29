import axios from "axios";

class AddressService {

    // Tỉnh/ thành phố
    static async getProvinces() {
        try {
            const url = "https://provinces.open-api.vn/api/p/";
            const response = await axios.get(url)

            if (response.data && response.status == 200) {
                return response.data;
            } else {
                return response.data
            }
        } catch (error: any) {
            if (error.response?.data) {
                return error.response?.data
            } else {
                return { isSuccess: false, message: error.message };
            }
        }
    }

    // Quận/ huyện
    static async getDistricts(provinceCode: number) {
        const searchParams = {
            params: {
                depth: 2
            }
        }
        try {
            const url = `https://provinces.open-api.vn/api/p/${provinceCode}`;
            const response = await axios.get(url, searchParams)

            if (response.data && response.status == 200) {
                return response.data;
            } else {
                return response.data
            }
        } catch (error: any) {
            if (error.response?.data) {
                return error.response?.data
            } else {
                return { isSuccess: false, message: error.message };
            }
        }
    }

    // Phường/ xã
    static async getWards(districtCode: number) {
        const searchParams = {
            params: {
                depth: 2
            }
        }
        try {
            const url = `https://provinces.open-api.vn/api/d/${districtCode}`;
            const response = await axios.get(url, searchParams)

            if (response.data && response.status == 200) {
                return response.data;
            } else {
                return response.data
            }
        } catch (error: any) {
            if (error.response?.data) {
                return error.response?.data
            } else {
                return { isSuccess: false, message: error.message };
            }
        }
    }

}

export default AddressService;
