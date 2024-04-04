import {useEffect, useState} from "react";
import * as service from "../service/CCDCService";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import MySwal from "sweetalert2";


export default function CCDC() {
    const [dataList, setDataList] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [searchManu, setSearchManu] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [ccdc, setCCDC] = useState({})
    const [employees, setEmployees] = useState([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
    const [borrowQuantity, setBorrowQuantity] = useState(0);
    const [remainingQuantity, setRemainingQuantity] = useState(0);
    useEffect(() => {
        if (showModal) {
            setRemainingQuantity(ccdc.soLuong);
        }
    }, [showModal, ccdc]);
    useEffect(() => {
        const fetchApi = async (searchName, searchManu, page) => {
            try {
                const result = await service.getAllCCDC(searchName, searchManu, page);
                const employeeResult = await service.getAllEmployee();
                setEmployees(employeeResult)
                setDataList(result.content);
                setTotalPages(result.totalPages);
                document.title = "Quản lý Công cụ dụng cụ"
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi(searchName, searchManu, 0);
    }, []);

    function handleSearchName(value) {
        setSearchName(value);
    }

    function handleSearchManu(value) {
        setSearchManu(value);
    }
    const handleEmployeeChange = (event) => {
        setSelectedEmployeeId(event.target.value);
    };
    const handleQuantityChange = (event) => {
        setBorrowQuantity(event.target.value);
    };
    const submitSearch = async () => {
        try {
            let res = await service.getAllCCDC(searchName, searchManu, 0);
            setDataList(res.content);
            setTotalPages(res.totalPages);
            setCurrentPage(0);
        } catch (e) {
            console.log(e);
        }
    }

    const handlePageClick = async (event) => {
        try {
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            const result = await service.getAllCCDC(searchName, searchManu, pageNumber);
            setDataList(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    }
    const openModal = (data) => {
        setCCDC(data)
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedEmployeeId(0)
        setBorrowQuantity(0)
        setShowModal(false);
        setCCDC({})
    };

    const handleSubmitBorrow = async () => {
        try {
            if (selectedEmployeeId === 0) {
                MySwal.fire({
                    text: " Vui lòng chọn nhân viên",
                    icon: "warning"
                });
                return;
            }
            if (borrowQuantity <= 0) {
                MySwal.fire({
                    text: " Số lượng CCDC mượn phải lớn hơn 0",
                    icon: "warning"
                });
                return;
            }
            if ( borrowQuantity > remainingQuantity) {
                MySwal.fire({
                    text: " Số lượng CCDC hiện tại không đủ",
                    icon: "warning"
                });
                return;
            }

            await service.createBorrow( selectedEmployeeId,ccdc.id, borrowQuantity);
            MySwal.fire({
                text: " Mượn thành công",
                icon: "success"
            });
            closeModal();
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="container body__employee">
                <h1>Quản lý CDCD</h1>
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <form className="form-group my-2 my-lg-0 p-0 m-0">
                                    <div className="d-inline">
                                        <div className="d-flex">
                                            <input
                                                className="form-control_employee mr-sm-2"
                                                type="search"
                                                placeholder="Nhập tên CCDC"
                                                name="searchName"
                                                aria-label="Search"
                                                onChange={(event) =>
                                                    handleSearchName(event.target.value)
                                                }
                                                id="searchName"
                                            />
                                            <input
                                                className="form-control_employee mr-sm-2"
                                                type="search"
                                                placeholder="Nhập tên Hang san xuaat"
                                                name="searchManu"
                                                aria-label="Search"
                                                onChange={(event) =>
                                                    handleSearchManu(event.target.value)
                                                }
                                                id="searchManu"
                                            />
                                            <button

                                                className="my-2 my-sm-0 btn__search_employee"
                                                type="button"
                                                onClick={() => submitSearch()}
                                            >
                                                Tìm kiếm
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div
                                className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                style={{width: "35px"}}
                            >
                                <Link to={"/ccdc/create"} className="btn__add_employee">
                                    <i className="material-icons">&#xE147;</i>
                                    <span>Thêm mới CCDC</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã CCDC</th>
                            <th>Tên CCDC</th>
                            <th>Hãng sản xuất</th>
                            <th>Đơn vị</th>
                            <th>Số lượng</th>
                            <th>Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataList ? (
                            dataList.map((data, index) => (
                                <tr key={data.id}>
                                    <td>{index + 1}</td>
                                    <td>{data.id < 10 ? 'CCDC-000' + data.id : data.id < 100 ? 'CCDC-00' + data.id : data.id < 1000 ? 'CCDC-0' + data.id : 'CCDC-' + data.id}</td>
                                    <td>{data.ten}</td>
                                    <td>{data.hangSanXuat}</td>
                                    <td>{data.donVi}</td>
                                    <td>{data.soLuong}</td>
                                    <td>
                                        <button onClick={() => openModal(data)} className="btn__add_employee">
                                            <span>Mượn CCDC</span>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-danger h5">
                                    Danh sách trống
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <div className="clearfix">
                        <div className="hint-text"></div>
                        <div className="page">
                            <ReactPaginate
                                forcePage={currentPage}
                                breakLabel="..."
                                nextLabel="Trang Sau"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="Trang Trước"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Màn hình mượn CCDC</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Nhân viên mượn :
                        <select  onChange={handleEmployeeChange}>
                            <option value={selectedEmployeeId}>Chọn nhân viên</option>
                            {
                                employees.map((employee) =>(
                                    <option value={employee.id} key={employee.id}>{employee.ten}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>Mã CCDC : {ccdc.id < 10 ? 'CCDC-000' + ccdc.id : ccdc.id < 100 ? 'CCDC-00' + ccdc.id : ccdc.id < 1000 ? 'CCDC-0' + ccdc.id : 'CCDC-' + ccdc.id}</div>
                    <div>Tên CCDC: {ccdc.ten}</div>
                    <div>Hãng sản xuất: {ccdc.hangSanXuat}</div>
                    <div>Đơn vị: {ccdc.donVi}</div>
                    <div>Số lượng còn trong kho: {ccdc.soLuong}</div>
                    <div> Số lượng mượn:
                        <input type="number" value={borrowQuantity} onChange={handleQuantityChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Huỷ</Button>
                    <Button variant="primary" onClick={()=>handleSubmitBorrow()} >Đồng ý</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


