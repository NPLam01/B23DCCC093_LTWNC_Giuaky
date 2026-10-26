import { Book, ApiResult } from '../types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'b-01',
    title: 'Cấu Trúc Dữ Liệu và Giải Thuật Nâng Cao',
    author: 'Nguyễn Văn A',
    category: 'CNTT',
    publishedYear: 2022,
    availableCopies: 3,
    description: 'Phân tích độ phức tạp thuật toán, cây cân bằng, đồ thị và tối ưu hóa bộ nhớ.',
  },
  {
    id: 'b-02',
    title: 'Thiết Kế Hệ Thống Phân Tán với Microservices',
    author: 'Trần Thị B',
    category: 'CNTT',
    publishedYear: 2023,
    availableCopies: 2,
    description: 'Kiến trúc hướng dịch vụ, giao tiếp bất đồng bộ qua Kafka/gRPC và xử lý chịu lỗi.',
  },
  {
    id: 'b-03',
    title: 'Học Máy và Trí Tuệ Nhân Tạo Ứng Dụng',
    author: 'Lê Hoàng C',
    category: 'CNTT',
    publishedYear: 2024,
    availableCopies: 4,
    description: 'Mô hình học có giám sát, mạng nơ-ron sâu Transformer và triển khai LLMs thực tế.',
  },
  {
    id: 'b-04',
    title: 'Kinh Tế Lượng Hiện Đại và Phân Tích Dữ Liệu Tài Chính',
    author: 'Phạm Minh D',
    category: 'Kinh tế',
    publishedYear: 2021,
    availableCopies: 2,
    description: 'Mô hình hồi quy đa biến, chuỗi thời gian ARIMA và kiểm định chuỗi tài chính.',
  },
  {
    id: 'b-05',
    title: 'Quản Trị Chiến Lược và Đổi Mới Sáng Tạo Doanh Nghiệp',
    author: 'Vũ Thị E',
    category: 'Kinh tế',
    publishedYear: 2023,
    availableCopies: 1,
    description: 'Hoạch định chiến lược cạnh tranh, chuyển đổi số và quản lý chuỗi giá trị toàn cầu.',
  },
  {
    id: 'b-06',
    title: 'Tài Chính Doanh Nghiệp Căn Bản và Nâng Cao',
    author: 'Đỗ Quang F',
    category: 'Kinh tế',
    publishedYear: 2020,
    availableCopies: 5,
    description: 'Định giá dòng tiền DCF, cơ cấu nguồn vốn tối ưu và quản trị rủi ro thanh khoản.',
  },
  {
    id: 'b-07',
    title: 'Tiếng Anh Chuyên Ngành Công Nghệ Thông Tin',
    author: 'David Harrison',
    category: 'Ngoại ngữ',
    publishedYear: 2022,
    availableCopies: 2,
    description: 'Từ vựng kỹ thuật phần mềm, kỹ năng đọc tài liệu kiến trúc RFC và viết tài liệu API.',
  },
  {
    id: 'b-08',
    title: 'Luyện Thi IELTS Academic: Kỹ Năng Đọc và Viết Chuyên Sâu',
    author: 'Sarah Jenkins',
    category: 'Ngoại ngữ',
    publishedYear: 2023,
    availableCopies: 3,
    description: 'Chiến thuật giải đề Reading học thuật khó và phát triển ý tưởng Writing Task 2 band 8.0+.',
  },
  {
    id: 'b-09',
    title: 'Tiếng Nhật Thương Mại B2 - B3',
    author: 'Kenji Sato',
    category: 'Ngoại ngữ',
    publishedYear: 2021,
    availableCopies: 1,
    description: 'Kính ngữ Keigo công sở, kỹ năng soạn thảo email và văn hóa đàm phán doanh nghiệp Nhật.',
  },
  {
    id: 'b-10',
    title: 'Lập Trình Web Nâng Cao với React và TypeScript',
    author: 'Nguyễn Thành G',
    category: 'CNTT',
    publishedYear: 2024,
    availableCopies: 2,
    description: 'Mô hình quản lý state đa tầng Redux/Zustand, kiểm thử RTL và tối ưu hóa render.',
  },
];

/**
 * Biến trạng thái mô phỏng lỗi phục vụ kiểm thử và tương tác UI.
 */
let forceApiError = false;

export const setSimulateApiError = (shouldFail: boolean): void => {
  forceApiError = shouldFail;
};

export const getSimulateApiError = (): boolean => {
  return forceApiError;
};

/**
 * Giả lập gọi API lấy danh sách sách chuyên ngành.
 * Delay 500ms, hỗ trợ mô phỏng lỗi.
 */
export const fetchBooksApi = async (
  simulateError = false
): Promise<ApiResult<Book[]>> => {
  return new Promise<ApiResult<Book[]>>((resolve) => {
    setTimeout(() => {
      if (simulateError || forceApiError) {
        resolve({
          ok: false,
          error: 'Lỗi mạng khi tải dữ liệu sách (Mô phỏng lỗi từ server - HTTP 500).',
        });
      } else {
        // Deep copy để tránh mutate dữ liệu gốc vô tình
        resolve({
          ok: true,
          data: JSON.parse(JSON.stringify(INITIAL_BOOKS)),
        });
      }
    }, 500);
  });
};
