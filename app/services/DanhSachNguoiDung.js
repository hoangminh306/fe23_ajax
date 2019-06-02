function DanhSachNguoiDung(){
    this.layDanhSachND = function (){
        // ajax trả thành công or thất bại
        // js cho phép bất đồng bộ
        // js k chờ hàm laydanhsachND chạy xong mà nó vẫn chạy xuống hàm khác chạy 
        // vì nếu laydanhsachND lấy data lâu quá thì mấy code ở dưới nó sẽ k chạy dc
        // khi nào lấy data xong thì nó quay lại hàm laydanhsachND chạy tiếp 

        // cách 2 - trả về ajax
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung`,
            type: "get"
        });
    };

    this.themNguoiDung = function(nguoiDung){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung`,
            type:"post",
            data: nguoiDung
        })
        .done(function(data){
            // "tai khoan da ton tai !" phải copy của thằng backend đưa
            // đi làm thì backend sẽ trả về mã lỗi, k trả chuỗi
            if(data === "tai khoan da ton tai !"){
                alert(data);
            }else{
                location.reload();    
            }
        })
        .fail(function(err){
            console.log(err);           
        })
    }

    this.xoaNguoiDung = function(nguoiDung){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${nguoiDung}`,
            type: "delete"
        })
        .done(function(data){
            alert("Xóa thành công");
            location.reload();
        })
        .fail(function(err){
            console.log(err);           
        })
    }

    // functional propraming --> hàm trả về --> đỡ tốn dung lượng khi lưu vào mảng rồi xử lý trên mảng đó
    this.layThongTinNguoiDung = function(taiKhoan){
        var mangNguoiDung = JSON.parse(localStorage.getItem("DSND-ajax"));
        return mangNguoiDung.find(function(item){
            // TaiKhoan ghi giống vs backend
            return item.TaiKhoan === taiKhoan;
        })
    }

    this.capNhatNguoiDung = function(nguoiDung){
        var ngDung = JSON.stringify(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: ngDung,
            contentType: "application/json",
            dataType: "json"
        })
        .done(function(data){
            alert("Cập nhật thành công");
            location.reload();
        })
        .fail(function(err){
            console.log(err);           
        })
    }

    // cách 1 - bỏ hàm tạo bảng vào class danhsachnguoidung
    // function taoBang(mangNguoiDung){
    //     var content = "";
    //     mangNguoiDung.map(function(item, index){
    //         content += `
    //             <tr>
    //                 <td>${index + 1}</td>
    //                 <td>${item.TaiKhoan}</td>
    //                 <td>${item.HoTen}</td>
    //                 <td>${item.MatKhau}</td>
    //                 <td>${item.Email}</td>
    //                 <td>${item.SoDT}</td>
    //                 <td>
    //                     <button class="btn btn-primary btnSua" data-taikhoan=${item.TaiKhoan}>Sửa</button>
    //                     <button class="btn btn-danger btnXoa" data-taikhoan=${item.TaiKhoan}>Xóa</button>
    //                 </td>
    //             </tr>
    //         `;
    //     })
    //     $("#tblDanhSachNguoiDung").html(content);
    // }
}