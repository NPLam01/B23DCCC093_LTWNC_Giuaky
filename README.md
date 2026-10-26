# 📚 Mini Library — Hệ Thống Quản Lý & Mượn Sách Chuyên Ngành

> Dự án bài tập lớn môn **Lập trình Web Nâng cao (LTWNC_GK)**  
> **Công nghệ chính:** React 19 · TypeScript · Redux Toolkit · Zustand · React Context · Jest / React Testing Library · Vite

---

## 1. Mục Tiêu & Định Hướng Kiến Trúc

**Mini Library** là ứng dụng tra cứu, mượn và trả sách chuyên ngành (CNTT, Kinh tế, Ngoại ngữ) dành cho sinh viên. Ứng dụng đáp ứng các chuẩn kỹ thuật nâng cao:

- **Feature-based architecture**: Tách bạch logic theo từng tính năng (`features/books`, `features/filters`, `features/borrowing`).
- **Phân chia state management chuyên biệt**:
  - **Redux Toolkit**: Quản lý dữ liệu nghiệp vụ toàn cục (danh sách sách, trạng thái API loading/succeeded/failed, danh sách ID sách đang mượn, cảnh báo).
  - **Zustand**: Quản lý bộ lọc tìm kiếm tức thời và thể loại được chọn.
  - **React Context**: Quản lý theme Sáng / Tối (Light / Dark mode) được memo hóa.
  - **Redux Custom Middleware**: Chặn yêu cầu mượn trước khi tới reducer nếu sinh viên đã mượn tối đa 3 cuốn sách, mượn lặp, hoặc sách hết bản.
- **Tối ưu hiệu năng**:
  - Generic custom hook `useDebounce<T>` trì hoãn tìm kiếm 300ms.
  - `React.memo` trên `BookCard`.
  - `useMemo` lọc danh sách sách, `useCallback` cho các event handler.
  - `React.lazy` và `Suspense` tải trang thống kê `/stats`.
- **Bảo vệ chất lượng bằng kiểm thử**:
  - Bộ test Jest và React Testing Library (RTL) với userEvent và fake timers, 100% test suites passed xanh.
- **Thiết kế thẩm mỹ**:
  - Màu chủ đạo: **Xanh (Blue) & Xám (Slate/Gray)** hiện đại, chuẩn UI/UX, hỗ trợ Dark Mode hoàn chỉnh.

---

## 2. Kiến Trúc Thư Mục Thực Tế

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

## 3. Checklist Nghiệm Thu & Kết Quả Đạt Được

### TypeScript & API
- [x] **Tuyệt đối không dùng `any`**: 100% mã nguồn được type an toàn với strict TypeScript.
- [x] **Generic `ApiResult<T>` & Type Guard**:
  - `ApiSuccess<T>`, `ApiFailure`, `ApiResult<T>`.
  - Type guard: `function isApiSuccess<T>(result: ApiResult<T>): result is ApiSuccess<T>`.
- [x] **Ít nhất 2 Utility Types**:
  - `BookPreview = Pick<Book, 'id' | 'title' | 'author'>`
  - `BookUpdate = Partial<Pick<Book, 'title' | 'author' | 'category'>>`
  - Bổ sung `CategoryStatistics = Readonly<Record<BookCategory, number>>`
- [x] **API Giả Lập**:
  - `fetchBooksApi` trả Promise trễ **500 ms**.
  - Tích hợp cờ mô phỏng lỗi mạng để kiểm thử giao diện `failed` và nút "Thử lại".

### Quản Lý State
- [x] **Redux Toolkit**:
  - Xử lý đầy đủ `pending`, `fulfilled`, `rejected` với `createAsyncThunk`.
  - Typed hooks `useAppDispatch` và `useAppSelector`.
  - Nghiệp vụ mượn (`borrowBook`), trả (`returnBook`), lưu danh sách ID sách mượn.
- [x] **Redux Middleware**:
  - `borrowLimitMiddleware` chặn action `borrowBook` trước `next(action)` nếu sinh viên đã mượn đủ 3 cuốn, mượn trùng, hoặc hết sách.
  - Tự động dispatch `setWarning` hiển thị cảnh báo trực quan cho người dùng.
- [x] **Zustand**:
  - `useFilterStore` quản lý từ khóa `keyword` và `category` tách biệt khỏi Redux.
- [x] **React Context**:
  - `ThemeContext` quản lý theme `'light' | 'dark'`, hook `useTheme()`, memo hóa context value bằng `useMemo`.

### Giao Diện & Tối Ưu Hiệu Năng
- [x] **useDebounce 300 ms**: Tìm kiếm mượt mà không re-render danh sách liên tục.
- [x] **useMemo**: Danh sách sách lọc theo từ khóa và thể loại được memo hóa.
- [x] **React.memo & useCallback**: `BookCard` bọc trong `React.memo`, các handler `onBorrow`, `onReturn` bọc trong `useCallback`.
- [x] **Code Splitting**: Trang `/stats` được tải bất đồng bộ bằng `React.lazy` và `Suspense`.
- [x] **Màu chủ đạo**: Thiết kế giao diện tông **Xanh (Blue) & Xám (Slate/Gray)** hiện đại, tinh tế.

### Kiểm Thử (Jest + RTL)
- [x] `booksSlice.test.ts`: **6 tests** (vượt yêu cầu tối thiểu 4 tests).
- [x] `BookCard.test.tsx`: **4 tests** dùng `@testing-library/react` và `@testing-library/user-event` (vượt yêu cầu tối thiểu 3 tests).
- [x] `useDebounce.test.ts`: **2 tests** dùng Jest Fake Timers (vượt yêu cầu tối thiểu 1 test).
- [x] `filterStore.test.ts`: **4 tests** cho Zustand store.
- [x] `borrowing.utils.test.ts`: **6 tests** cho nghiệp vụ mượn sách.
- [x] `borrowLimitMiddleware.test.ts`: **2 tests** cho middleware Redux.
- [x] `npm test` **24/24 tests passed xanh hoàn toàn**.

---

## 4. Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

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
