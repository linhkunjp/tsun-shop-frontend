import * as yup from 'yup'

export const OrderSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Vui lòng nhập họ tên"),
    email: yup.string()
        .required('Email không được để trống'),
    phoneNumber: yup
        .string()
        .required('Số điện thoại không được trống'),
    address: yup
        .string()
        .required('Địa chỉ không được trống'),
    province: yup
        .string()
        .required('Vui lòng chọn tỉnh thành'),
    district: yup
        .string()
        .required('Vui lòng chọn quận huyện'),
    ward: yup
        .string()
        .required('Vui lòng chọn phường xã'),
})
