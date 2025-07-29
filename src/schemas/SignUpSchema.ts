import * as yup from 'yup'

export const SignUpSchema = yup.object().shape({
    lastName: yup
        .string()
        .required("Tên không được để trống")
        .matches(/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\u4e00-\u9fa5\u3040-\u30ff]+$/u, "Chỉ cho phép nhập ký tự chữ cái")
        .min(2, 'Tên phải có ít nhất 2 kí tự')
        .max(50, 'Tên không được quá 50 ký tự'),
    email: yup.string()
        .required('Email không được để trống')
        .test('valid-email', 'Email không hợp lệ. Vui lòng nhập đúng định dạng email', (value) => {
            if (!value) return true;

            const emailRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/;
            return emailRegex.test(value);
        }),
    password: yup.string().required('Mật khẩu không được để trống'),
})
