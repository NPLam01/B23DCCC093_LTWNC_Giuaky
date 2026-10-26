# Mini Library — Hệ Thống Quản Lý & Mượn Sách Chuyên Ngành


> **Công nghệ chính:** React 19 · TypeScript · Redux Toolkit · Zustand · React Context · Jest / React Testing Library · Vite

---
## 1. Kiến Trúc Thư Mục Thực Tế

```text
minilib/
├── public/
│   └── favicon.svg                      # Icon thư viện SVG
├── src/
│   ├── api/
│   │   └── booksApi.ts                  # Mock API Promise 500ms, mô phỏng lỗi mạng
│   ├── app/
│   │   ├── store.ts                     # Cấu hình Redux store & setupStore cho test
│   │   ├── hooks.ts                     # Typed hooks useAppDispatch, useAppSelector
│   │   ├── rootReducer.ts               # Root reducer kết hợp các slices
│   │   └── middleware/
│   │       ├── borrowLimitMiddleware.ts # Middleware kiểm soát giới hạn tối đa 3 cuốn
│   │       └── __tests__/
│   │           └── borrowLimitMiddleware.test.ts
│   ├── types/
│   │   ├── book.types.ts                # Model Book, BookCategory, Utility Types
│   │   ├── api.types.ts                 # ApiResult<T>, type guard isApiSuccess
│   │   └── index.ts                     # Barrel export
│   ├── features/
│   │   ├── books/
│   │   │   ├── booksSlice.ts            # Redux slice: borrowBook, returnBook, extraReducers
│   │   │   ├── booksThunks.ts           # Async Thunk fetchBooks
│   │   │   ├── booksSelectors.ts        # Typed memoized selectors
│   │   │   ├── books.utils.ts           # filterBooks, calculateCategoryStats
│   │   │   └── __tests__/
│   │   │       └── booksSlice.test.ts   # Unit tests reducer & thunks (6 test cases)
│   │   ├── filters/
│   │   │   ├── filterStore.ts           # Zustand store: keyword, category
│   │   │   └── __tests__/
│   │   │       └── filterStore.test.ts  # Unit tests Zustand store
│   │   └── borrowing/
│   │       ├── borrowing.utils.ts       # Nghiệp vụ: MAX_BORROW_LIMIT, canBorrowBook
│   │       └── __tests__/
│   │           └── borrowing.utils.test.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx            # Khung giao diện, thanh cảnh báo
│   │   │   ├── Header.tsx               # Header, logo, nút đổi theme, badge sách mượn
│   │   │   └── Navigation.tsx           # Điều hướng Kho Sách & Thống Kê
│   │   ├── books/
│   │   │   ├── BookCard.tsx             # Thẻ sách (React.memo, xử lý hết sách/đang mượn)
│   │   │   ├── BookList.tsx             # Danh sách sách, useDebounce, useMemo, useCallback
│   │   │   ├── BookSearch.tsx           # Ô tìm kiếm liên kết Zustand
│   │   │   ├── BookFilter.tsx           # Nút chọn thể loại (Pills)
│   │   │   ├── MyBorrowedBooks.tsx      # Danh sách sách sinh viên đang mượn
│   │   │   └── __tests__/
│   │   │       └── BookCard.test.tsx    # RTL & userEvent tests (4 test cases)
│   │   └── common/
│   │       ├── Loading.tsx              # Component xoay tải dữ liệu
│   │       ├── ErrorMessage.tsx         # Thông báo lỗi + nút Thử lại
│   │       └── EmptyState.tsx           # Trạng thái không có dữ liệu
│   ├── hooks/
│   │   ├── useDebounce.ts               # Generic debounce hook
│   │   └── __tests__/
│   │       └── useDebounce.test.ts      # Test fake timers
│   ├── context/
│   │   └── ThemeContext.tsx             # Context Theme Sáng/Tối, useMemo value
│   ├── pages/
│   │   ├── HomePage.tsx                 # Trang chính tra cứu & mượn sách
│   │   └── StatsPage.tsx                # Trang thống kê biểu đồ & tỷ lệ thể loại
│   ├── routes/
│   │   └── AppRouter.tsx                # Dynamic Router & React.lazy load StatsPage
│   ├── test/
│   │   ├── setupTests.ts                # Jest DOM matchers
│   │   ├── testUtils.tsx                # renderWithProviders cho test
│   │   └── mocks/
│   │       └── mockBooks.ts             # Dữ liệu sách mẫu phục vụ kiểm thử
│   ├── App.tsx                          # Root component
│   ├── main.tsx                         # Entry point với Providers
│   ├── index.css                        # Design system: Blue & Slate/Gray Palette
│   └── vite-env.d.ts
├── jest.config.ts                       # Cấu hình Jest & ts-jest
├── tsconfig.json                        # Cấu hình TypeScript Strict Mode
├── package.json
└── README.md
```

---


## 2. Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Khởi động môi trường phát triển (Dev Server)
```bash
cd minilib
npm run dev
```
Truy cập: `http://localhost:5173/`

### Chạy bộ kiểm thử (Jest Unit & Integration Tests)
```bash
npm test
```

### Đóng gói sản phẩm (Production Build & Typecheck)
```bash
npm run build
```
Build hoàn tất sẽ sinh ra thư mục `dist/` với chunk code-splitting riêng biệt cho `StatsPage`.
