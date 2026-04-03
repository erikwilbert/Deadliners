# Tugas Kelompok 2 - Authentication & Authorization



Website yang dibuat merupakan web sederhana berisi biodata kelompok yang dapat diakses oleh siapa saja tanpa perlu login. Halaman utama menampilkan informasi anggota kelompok secara publik. Untuk mengakses fitur khusus, pengguna dapat login menggunakan akun Google dengan mekanisme OAuth sehingga proses autentikasi dilakukan secara aman tanpa menyimpan password di sistem.

Saat pengguna pertama kali berhasil login menggunakan Google, sistem akan membuat akun berdasarkan email Google yang terverifikasi, lalu pengguna diarahkan ke menu profile untuk melengkapi data diri. Data yang diisi meliputi username, nama depan dan belakang, tanggal serta tempat lahir, jenis kelamin, status hubungan, bio, foto profil, nomor telepon, alamat, serta tautan media sosial atau tautan lainnya. Seluruh informasi tersebut disimpan ke dalam tabel user di database dan setiap akun memiliki id unik berbentuk UUID.

Setelah data tersimpan, pengguna dapat mengakses kembali menu profile untuk mengedit dan memperbarui informasi biodata miliknya sendiri. Namun, hanya anggota kelompok yang memiliki email terdaftar di database sebagai admin yang dapat melakukan perubahan tampilan website seperti warna dan font. Sistem akan mencocokkan email pengguna yang login dengan daftar email admin yang telah di-hardcode di database. Selain itu, data yang ditampilkan pada halaman utama hanya berasal dari akun anggota kelompok yang emailnya terdaftar sebagai admin. Pengguna lain tetap dapat login dan mengisi biodata, tetapi datanya tidak akan ditampilkan pada halaman utama dan tidak memiliki hak untuk mengubah tampilan website.


---

## Contributor
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/helvenix">
                <img src="https://avatars.githubusercontent.com/u/109453997?v=4" width="80px;" alt="Helven Marica"/>
                <br /><sub><b>Helven Marcia</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/haekalhdn">
                <img src="https://avatars.githubusercontent.com/u/178357458?v=4" width="80px;" alt="Haekal Handrian"/>
                <br /><sub><b>Haekal Handrian</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/KareemMalik">
                <img src="https://avatars.githubusercontent.com/u/179297121?v=4" width="80px;" alt="Malik Alifan Kareem"/>
                <br /><sub><b>Malik Alifan Kareem</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/erikwilbert">
                <img src="https://avatars.githubusercontent.com/u/198186768?v=4" width="80px;" alt="Erik Wilbert"/>
                <br /><sub><b>Erik Wilbert</b></sub>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/Zenixalarate01">
                <img src="https://avatars.githubusercontent.com/u/187471117?v=4" width="80px;" alt="Dylan Pirade"/>
                <br /><sub><b>Dylan Pirade</b></sub>
            </a>
        </td>
    </tr>
</table>


---

## Mekanisme Autentikasi & Otorisasi
Autentikasi pada website ini menggunakan OAuth 2.0 dengan Google sebagai identity provider. Ketika pengguna menekan tombol login dengan Google, sistem akan mengarahkan pengguna ke halaman autentikasi Google. Setelah pengguna berhasil login dan memberikan izin, Google akan mengirimkan authorization code yang kemudian ditukar oleh server menjadi access token dan ID token. ID token diverifikasi untuk memastikan keaslian dan validitasnya, termasuk pengecekan signature, issuer, audience, dan masa berlaku token. Jika valid, sistem mengambil informasi utama seperti email dan nama untuk mengidentifikasi pengguna. Jika email belum terdaftar di database, sistem akan membuat akun baru, sedangkan jika sudah terdaftar maka pengguna langsung mendapatkan sesi aktif. Setelah proses ini, server membuat session atau token login yang digunakan untuk mengakses endpoint yang memerlukan autentikasi.

Otorisasi diterapkan berdasarkan status login dan pencocokan email dengan daftar admin yang telah ditentukan di database. Semua endpoint yang berkaitan dengan pengisian dan pengeditan profil dilindungi oleh middleware untuk memastikan pengguna telah login dan memiliki session yang valid, serta hanya dapat mengubah biodata miliknya sendiri. Untuk fitur perubahan tampilan website, sistem akan memeriksa apakah email pengguna yang sedang login termasuk dalam daftar email admin yang terdaftar di database. Jika tidak sesuai, maka akses akan ditolak dengan respons unauthorized. Sementara itu, halaman utama hanya menampilkan data dari akun dengan email yang termasuk dalam daftar admin, meskipun pengguna lain tetap dapat memiliki akun dan menyimpan biodata mereka di sistem.


---

## Role Pengguna
| Role                | Deskripsi        |
|------------------------------|-----------|
| Admin        | Pengguna dengan hak akses tertinggi yang memiliki kemampuan untuk mengubah profil masing-masing yang ditampilkan ke publik beserta mengubah warna accent tulisan. |
| Basic User                | Pengguna terdaftar yang dapat mengisi profil, namun data mereka tidak akan ditampilkan di halaman publik |



