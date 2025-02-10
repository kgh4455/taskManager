# 할 일 관리 앱 (백엔드)

## 1. 프로젝트 개요
이 프로젝트는 할 일 관리 기능을 제공하는 RESTful API 서버입니다. Spring Boot와 MySQL을 기반으로 개발되었으며, 검색 및 필터링 기능이 포함된 CRUD API를 제공합니다.

### **주요 기능**
- 할 일 추가, 수정, 삭제 기능
- 목표 날짜 설정 및 상태 변경 기능
- 조건 검색 및 필터링 기능 제공
- Swagger를 통한 API 명세 및 테스트

---

## 2. 기술 스택
- Spring Boot v3
- Spring Data JPA (데이터베이스 연동)
- MySQL (데이터베이스)
- Swagger (API 문서화)
- JUnit5 & Mockito (테스트)

---

## 3. 소스 빌드 및 실행 방법 (STS 사용)

### **개발 환경**
- Java 17 이상
- STS (Spring Tool Suite) 설치
- MySQL 데이터베이스 설치

### **설치 및 실행**
1. **데이터베이스 설정**
   - MySQL 스키마: `sheet`
   - 사용자: `root`, 비밀번호: `0000`
   - 초기 데이터 및 스키마 파일은 `db/backup.sql`에 있습니다.

2. **STS에서 프로젝트 실행**
   1. **STS**를 열고 `backend` 프로젝트를 가져옵니다.
      - **File** → **Import** → **Existing Gradle Project**를 선택합니다.
      - 프로젝트 경로에서 `backend` 폴더를 선택하고 **Finish**를 클릭합니다.
   2. 프로젝트가 가져와지면, **`TaskManagerApiApplication.java`** 파일을 엽니다.
   3. 클래스 상단에 있는 **녹색 실행 버튼(▶)**을 클릭하여 서버를 실행합니다.
   4. 서버가 정상적으로 실행되면 브라우저에서 아래 주소로 접속하여 API 문서를 확인합니다:
      - [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 4. API 명세

| HTTP 메서드 | 엔드포인트          | 설명                  | 요청 예시                       |
|-------------|---------------------|-----------------------|---------------------------------|
| `GET`       | `/api/todo/items`   | 모든 할 일 목록 조회  | -                               |
| `POST`      | `/api/todo/items`   | 새로운 할 일 추가     | `{ "task": "새 할 일" }`        |
| `PUT`       | `/api/todo/items/{id}` | 특정 할 일 수정     | `{ "task": "수정된 할 일" }`    |
| `DELETE`    | `/api/todo/items/{id}` | 특정 할 일 삭제     | -                               |


---

## 5. 주요 라이브러리 설명

### **1) Spring Boot**
- RESTful API 서버 개발을 위한 프레임워크입니다.

### **2) Spring Data JPA**
- MySQL 데이터베이스와의 연동 및 CRUD 기능 구현에 사용했습니다.

### **3) Swagger**
- API 문서화 및 테스트를 자동으로 생성하기 위해 사용했습니다.

### **4) Lombok**
- 반복되는 코드(예: Getter, Setter)를 줄이기 위해 사용했습니다.

---

## 6. 테스트 케이스

### **테스트 코드 파일**
- `src/test/java/com/example/demo/service/ToDoItemServiceTest.java`

### **테스트 설명**
1. **`testCreateItem()`**  
   - 할 일 추가 기능 테스트
2. **`testGetAllItems()`**  
   - 할 일 목록 조회 기능 테스트
3. **`testUpdateItem()`**  
   - 할 일 수정 기능 테스트
4. **`testDeleteItem()`**  
   - 할 일 삭제 기능 테스트

---

## 7. 프로젝트 구조

backend/
 ├── src/
 │    ├── main/
 │    │    ├── java/
 │    │    │    └── com.example.demo/  # 주요 코드 폴더
 │    │    └── resources/               # 설정 파일 폴더
 └── build.gradle                       # Gradle 설정 파일

## 8. 에러 처리 및 응답 코드

### **주요 응답 코드**
| 상태 코드 | 설명                       |
|-----------|----------------------------|
| `200 OK`  | 요청이 성공적으로 처리됨    |
| `400 Bad Request` | 잘못된 요청 (입력 값 오류 등) |
| `404 Not Found`   | 요청한 리소스를 찾을 수 없음 |
| `500 Internal Server Error` | 서버 내부 오류 발생 |

## 9. 데이터베이스 스키마 및 초기 데이터
- **테이블 이름**: `todo_item`
- **컬럼 구조**:
  | 컬럼명       | 타입          | 설명               |
  |--------------|---------------|--------------------|
  | `id`         | BIGINT (PK)   | 기본 키            |
  | `task`       | VARCHAR(255)  | 할 일 제목         |
  | `completed`  | BOOLEAN       | 완료 여부          |
  | `due_date`   | DATE          | 목표 날짜          |