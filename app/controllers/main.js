$(document).ready(function(){
    var danhSachND = new DanhSachNguoiDung();
    layDanhSachNguoiDung();

    function layDanhSachNguoiDung(){
        // cách 2 - vì laydanhsachND() là ajax --> .done .fail dc
        danhSachND.layDanhSachND()
        .done(function(data){
            localStorage.setItem("DSND-ajax", JSON.stringify(data));
            taoBang(data);
        })
        .fail(function(err){
            console.log(err);
        });
    }

    function test(){}

    function taoBranchhoangminh(){
        
    }

    $("#btnThemNguoiDung").click(function(){
        changeModal("Thêm người dùng", "Thêm", "btnThem");
    })

    $("body").delegate(".btnSua", "click", function(){
        changeModal("Sửa người dùng", "Cập nhật", "btnCapNhat");

        $("#TaiKhoan").attr("disabled", "true"); 

        var taiKhoan = $(this).data("taikhoan");

        var nguoiDung = danhSachND.layThongTinNguoiDung(taiKhoan);
        
        $("#TaiKhoan").val(nguoiDung.TaiKhoan);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    })

    $("body").delegate("#btnCapNhat", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt, loaiNguoiDung);

        danhSachND.capNhatNguoiDung(nguoiDung);
    })

    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt, loaiNguoiDung);
        
        danhSachND.themNguoiDung(nguoiDung);     
    })

    $("body").delegate(".btnXoa", "click", function(){
        var taiKhoan = $(this).data("taikhoan");
        danhSachND.xoaNguoiDung(taiKhoan);   
    })

    function taoBang(mangNguoiDung){
        var content = "";
        mangNguoiDung.map(function(item, index){
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.TaiKhoan}</td>
                    <td>${item.HoTen}</td>
                    <td>${item.MatKhau}</td>
                    <td>${item.Email}</td>
                    <td>${item.SoDT}</td>
                    <td>${item.TenLoaiNguoiDung}</td>
                    <td>
                        <button class="btn btn-primary btnSua" data-toggle="modal" data-target="#myModal" data-taikhoan=${item.TaiKhoan}>Sửa</button>
                        <button class="btn btn-danger btnXoa" data-taikhoan=${item.TaiKhoan}>Xóa</button>
                    </td>
                </tr>
            `;
        })
        $("#tblDanhSachNguoiDung").html(content);
    }

    function changeModal(title, BtnTitle, btnID){
        // modal header
        var title = title;
        $(".modal-title").html(title);

        // modal footer
        var footer = `
            <button id= ${btnID} class="btn btn-success">${BtnTitle}</button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng</button>
        `;
        $(".modal-footer").html(footer);
    }
})