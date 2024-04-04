import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import async from "async";
import {createCCDC} from "../service/CCDCService";
import MySwal from "sweetalert2";
import * as Yup from "yup";

export default function CCDCCreate(){
    const navigate = useNavigate()
   const handleSubmitSave = async (ccdc)=>{
       let result = await createCCDC(ccdc);
       console.log(ccdc)
       if (result){
           MySwal.fire({
               text: " Thêm mới thành công",
               icon: "success"
           });
           navigate("/ccdc")
       }

   }
    const validationObject = {
        ten: Yup.string().required("Tên không được để trống").min(2, "Tên ít nhất 2 ký tự").max(100, "Tên tối đa 100 ký tự"),
        hangSanXuat: Yup.string().required("Hãng sản xuất không được để trống").min(2, "Tên hãng ít nhất 2 ký tự").max(100, "Tên hãng tối đa 100 ký tự"),
        soLuong: Yup.number().required("Số lượng không được để trống").min(1,"Số lượng phải lớn hơn 0"),
        donVi: Yup.string().required("Đơn vị không được để trống")
    }


    return(
        <>
            <Formik
                initialValues={
                    {
                        ten: '',
                        hangSanXuat: '',
                        soLuong: 0,
                        donVi: ''
                    }
                }
                validationSchema={Yup.object(validationObject)}
                    onSubmit={handleSubmitSave
                    }>
                <div className="container-fluid mb-5">
                    <h2 style={{textAlign: "center"}} className="mt-3">Thêm mới CCDC</h2>
                    <Link to={'/ccdc'}> Trở lại</Link>
                    <Form>
                        <table>
                            <tr>
                                <td><label htmlFor='ten'>Tên CCDC</label></td>
                                <td><Field name="ten" id='ten' type="text"/><br/>
                                    <ErrorMessage style={{color: 'red'}} name="ten" component='span' className="form-err" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='hangSanXuat'>Hãng sản xuất</label>
                                </td>
                                <td>
                                    <Field name="hangSanXuat" id='hangSanXuat' type="text"/><br/>
                                    <ErrorMessage style={{color: 'red'}} name="hangSanXuat" component='span' className="form-err" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="soLuong">Số lượng</label>
                                </td>
                                <td>
                                    <Field name="soLuong" id='soLuong' type="text"/><br/>
                                    <ErrorMessage style={{color: 'red'}} name="soLuong" component='span' className="form-err" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="donVi">Đơn vị</label>
                                </td>
                                <td>
                                    <Field name="donVi" id='donVi' type="text"/><br/>
                                    <ErrorMessage style={{color: 'red'}} name="donVi" component='span' className="form-err" />
                                </td>
                            </tr>
                            <tr>
                                <button>Tạo mới</button>
                            </tr>
                        </table>

                    </Form>
                </div>
            </Formik>
        </>
    )
}