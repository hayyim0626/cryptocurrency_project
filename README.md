# Crypto Currency Project
  일주일간 가상화폐 미니 프로젝트를 진행했습니다.
이번 프로젝트는 기존의 프로젝트와 달리 다른 개발자분들과의 협업이 아닌, 개인적인 프로젝트로서
CRA 초기세팅 과정부터 github을 통한 버전 관리 최신화, 모든 페이지 레이아웃 및 로직 등 모든 부분을 혼자서 수행했습니다.

개인 프로젝트를 진행해본 것은 이번이 처음이라 낯설었지만 이번 기회를 통해 잘 몰랐던 개념들을 다시 공부하게 되었고,
헷갈렸던 개념에 대해서도 확실하게 다시 짚고 넘어갈 수 있었던 귀중한 시간이었습니다.

![CryptoCurrency](https://user-images.githubusercontent.com/68314696/101172971-37398980-3685-11eb-8c5f-39850badf3cd.gif)

## 🗓 작업 기간
**- 2020.11.27 - 2020.12.4**

## 🔧 기술 스택
**- JavaScript(ES6+)**<br>
**- React hooks**<br>
**- SCSS**<br>
**- Redux**<br>
**- Axios**<br>
**- React toastify**<br>
**- Github**<br>

## 💻 기능 구현

### CRA 초기세팅 및 컴포넌트 분류
가장 먼저 CRA 초기세팅을 완료한 후, github에 새로운 레퍼지토리를 만들어 버전 관리를 수행했습니다.

이번 프로젝트는 가상화폐 리스트 페이지, 북마크 목록 페이지, 상세 페이지
크게 총 세 페이지로 구성되어 있습니다.

이를 React Router를 통해 한 화면에서 나타낼 수 있도록 구현했으며 공통으로 들어가는 컴포넌트(Loader, CurrencyInfoBox)의 경우 component파일에 따로 작업하여 컴포넌트의 재사용성을 높였습니다.
API를 호출하는 경우 axios를 통해 구현했으며 예외 처리를 위해 try/catch 문법을 사용했습니다.
### 리스트 페이지
이번 프로젝트에서 가장 공을 많이 들였던 컴포넌트입니다.
- 별표 클릭 시 북마크 목록에 저장 및 toast 기능 구현<br>
별표 클릭 시 북마크 목록에서도 보이게 하기 위해서 전역 상태 관리 라이브러리인 Redux를 사용했습니다.
별을 클릭했을 때, onclick함수가 실행이 되는데 onClick함수는 store에 해당 데이터가 들어가 있는지를 id를 통해 판별하게 됩니다.
store에 동일한 아이디가 저장되어있지 않는 경우 store에 저장한 후, className을 통해 별의 색깔을 바꿔주는 로직을 구현했습니다.
store에 동일한 아이디가 저장되어있는 경우 이미 북마크에 추가 된 것으로 인지하고 state를 변경합니다.
또한 별표가 클릭이 될 때마다 조건을 판별하여 toast 기능을 구현했습니다. 새로 추가하는 경우 "북마크에 추가되었습니다"라는 문구가 뜨고 삭제하는 경우 "북마크가 해제되었습니다"라는 문구가 뜹니다.
toast 기능을 구현하기 위해 react-toastify 라이브러리를 사용했습니다.
그러나 이 부분에서 북마크 페이지 이동 후 다시 리스트 페이지로 돌아왔을 때 store에 데이터가 담겨있음에도 별표의 색깔이 꺼져있는 버그를 발견했습니다.
이를 해결하기 위해 
state.includes((data) => {return data === ;})
state.find((data) => {return data.id === id;})
- select box를 통한 api 호출<br>
select box에서 클릭한 조건에 따라 API호출을 하기 위해 basicUrl이라는 변수에 담은 후, API가 변경되는 부분을 template literal을 통해 구현했습니다.
basicUrl의 초기 상태는 `krw, 50, 1`인데 이는 아이템이 50개씩 한국화폐기준, 첫번 째 페이지를 의미합니다.
이후 select box에 담긴 조건에 따라 api를 호출한 후 화면에 다시 렌더링되도록 구현했습니니다.
api는 조건이 바뀔때마다 호출되도록 만들었는데, 이는 앞서 설정했던 초기 상태가 바뀔 때마다 api호출을 하는 로직으로 구현했습니다.
그러나 이 부분에서 조건에 따른 렌더링은 성공적으로 이루어지지만 selectBox의 UI가 그대로 남아있는 버그가 발견이 되었습니다. 
이를 해결하기 위해 옵션 태그에 `selected={vsCurrency === el.slice(0, 3).toLowerCase() ? "selected" : ""}` 이러한 조건을 넣었습니다.
select 태그와 option 태그의 경우 이번 프로젝트에서 처음 사용해본터라 자체 리팩토링을 진행하면서 공부해야겠다 마음먹었습니다.
- 증감률에 따른 색깔 변화 로직 구현<br>
들어오는 데이터가 -를 포함하고 있는지에 따라 class명을 바꿔 구현했습니다.
- 가상화폐 이름 클릭 시 리스트 상세 페이지로 이동<br>
가상화폐의 이름을 클릭했을 때, `<Link className="name" to={`/currencydetail/${data.id}`}>` 다음과 같이 id를 통해 endpoint를 변경했습니다.
### 북마크 목록 페이지 
- 북마크에 들어온 별표 클릭 시 별 색깔 변경 및 북마크 목록에서 삭제, toast기능 구현<br>
북마크 목록 페이지는 리스트 페이지에서 들어온 가상화폐들이 한 곳에 담겨있는 페이지입니다.
북마크를 해제할 경우 스토어에 담긴 데이터가 삭제되면서 북마크 목록에서 없어지도록 구현하였습니다.
또한 toast의 경우 store에 담긴 state의 변화에 따라 "북마크가 해제되었습니다"가 표시되도록 구현하였습니다. 
### 리스트 상세 페이지
- 상세페이지 레이아웃 구현<br>
- 코인 이름에 따른 API 호출 및 렌더링<br>
- 코인 이름에 따른 동적 라우팅 기능 구현<br>
상세 페이지 API의 경우 리스트 페이지와 다른 API를 사용하였으며 리스트 동적 라우팅을 통해 상세 페이지의 API를 호출했습니다.
그 때마다 받아오는 API의 경우 `match.params.id`를 통해 구현했습니다.

### 구현하지 못한 부분
- 리스트 페이지 더보기 기능<br>
리스트 페이지 더보기 기능의 경우 다음과 같은 로직을 구현했으나, 더보기 버튼 클릭 시, 데이터가 하나밖에 들어오지 않는 버그가 발생했습니다. 리팩토링을 하면서 버그를 수정하고 정상적으로 구현할 예정입니다.
<img width="484" alt="20201204_231700" src="https://user-images.githubusercontent.com/68314696/101179714-f09c5d00-368d-11eb-8380-9913b9b9dcb8.png">
- 리스트 상세 페이지 계산 기능 <br>
- 리스트 상세 페이지 북마크 추가 기능 <br>
리스트 상세 페이지 계산 기능의 경우 앞서 말했던 3가지의 버그에 대한 수정 작업으로 인해 아직 구현하지 못한 기능입니다. 이 부분도 리팩토링을 진행하면서 구현할 예정입니다.
