import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomNavigationBar from '../commons/BottomNavigationBar';
import { palette } from '../constants/palette';
import { getHeightPixel, getPixelToPixel, getWidthPixel } from '../utils/responsive';
import { ReactComponent as Notification_Icon } from '../assets/icon/notification.svg';
import { ReactComponent as Main_Logo } from '../assets/icon/logo.svg';
import { ReactComponent as Search_Icon } from '../assets/icon/search.svg';
import SearchContainer from '../container/main/SearchContainer';
import NotoText from '../components/Text/NotoText';
import CategoryListContainer from '../commons/CategoryListContainer';
import NoticeListContainer from '../commons/NoticeListContainer';
import NotSearchedContainer from '../container/main/NotSearchedContainer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isExpired } from '../utils/refresh';
import axios from 'axios';
import { NoticeProps } from '../constants/types';
// import { ReactComponent as Reservatio`n } from '../assets/logo.svg';

const mockupData_1 = [
  {
    id: 1,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: true,
  },
  {
    id: 2,
    title: '2023아ㅜㄻ낼주내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 3,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: true,
  },
  {
    id: 4,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 5,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 6,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 7,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 8,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 9,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 10,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 11,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 12,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 13,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 14,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 15,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 16,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 17,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
  {
    id: 18,
    title: '2023학년도 제1학기 복수전공 전형 면접 일정 안내',
    date: '2021.09.01',
    detail: '2023학년도 제1학기 복수전공 전형 면접 일정 안내을 받았습니다.',
    isScraped: false,
  },
];

const mockupData_2 = [
  {
    id: 1,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: true,
  },
  {
    id: 2,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 3,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: true,
  },
  {
    id: 4,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 5,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 6,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 7,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 8,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 9,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 10,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 11,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 12,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 13,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 14,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 15,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 16,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 17,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
  {
    id: 18,
    title: 'This is Two',
    date: '2021.09.01',
    detail: 'This is Two을 받았습니다.',
    isScraped: false,
  },
];

const mockupCategory = [
  {
    id: 'hi',
    title: 'KUPID 전체',
  },
  {
    id: 'hello',
    title: '학사일정',
  },
  {
    id: '333',
    title: '일반 공지',
  },
];

function MainPage(props: any) {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const token = useSelector((store: any) => store.tokenReducer);
  // TODO server에서 받아온 데이터를 저장하는 state
  // TODO 한번에 가져오지 말고 infinite scroll로 가져오기
  // type Notice = {
  //   noticeId: string;
  //   title: string;
  //   date: string;
  //   provider: string;
  //   viewCount: number;
  //   categoryName: string;
  //   isScraped: boolean;
  // };
  const [noticeData, setNoticeData] = useState<NoticeProps[]>([]);
  // 카테고리에 따라 서버에 요청해서 데이터를 받아오는 함수
  const getNoticeList = async (category: string) => {
    isExpired(token);
    console.log(category);

    axios.defaults.headers.common['x-auth-token'] = token.payload.accessToken;
    const response = await axios.get('https://kudog.email/notices', {
      params: {
        categoryName: 'InfomaticsNotice',
      },
    });
    console.log(response.data.data);
    setNoticeData(response.data.data);
  };
  // 카테고리 변경 함수
  // TODO 검색어도 해당 카테고리에 맞게 재검색 필요 (API 나온후 작업)
  const changeCategory = (cat: string) => {
    console.log(cat);

    setCategory(cat);
    setIsSearch(false);
  };
  // 서버에 검색 요청
  const getSearchedList = () => {
    // TODO 서버에 검색 요청

    console.log(search);
    changeCategory('AndNotice');
    setIsSearch(true);
  };
  // 카테고리 변경시 getNoticeList 호출
  useEffect(() => {
    getNoticeList(category);
  }, [category]);
  // 공지사항 북마크 변경
  const changeBookmark = (idx: number) => {
    // TODO 서버에 저장 get request
    const newNoticeData = noticeData.map(data => {
      if (data.noticeId === idx) {
        return {
          ...data,
          isScraped: !data.isScraped,
        };
      }
      return data;
    });
    setNoticeData(newNoticeData);
  };
  const navigate = useNavigate();
  const goNoticeDetail = (noticeId: number) => {
    navigate(`/notice/${noticeId}`);
  };
  //검색버튼이 눌렸는데 검색 응답이 없는 경우
  if (isSearch) {
    return (
      <PageStyled>
        <div className="w-full flex flex-row items-center justify-center">
          <LogoPageStyled>
            <div className="w-70px">
              <MainLogoStyled width={getWidthPixel(58)} height={getHeightPixel(22.3)} />
            </div>
            <TitleStyled>
              <NotoText fontSize={getWidthPixel(19)} fontColor={palette.white}>
                홈
              </NotoText>
            </TitleStyled>
            <div className="w-70px">
              <NotificationIconStyled />
            </div>
          </LogoPageStyled>
        </div>
        <MainPageStyled>
          <SearchContainer
            width={getWidthPixel(357)}
            height={getHeightPixel(40)}
            fontSize={getHeightPixel(14)}
            placeHolder="검색어를 입력하세요"
            setFunc={setSearch}
            icon={<SearchIconStyled />}
            searchFunc={getSearchedList}
          />
          <CategoryListContainer
            CategoryList={mockupCategory}
            changeCategory={changeCategory}
            selectedCategory={category}
          />
          <NotSearchedContainer />
        </MainPageStyled>
        <BottomNavigationBar />
      </PageStyled>
    );
  } else
    return (
      <PageStyled>
        <div className="w-full flex flex-row items-center justify-center">
          <LogoPageStyled>
            <div className="w-70px">
              <MainLogoStyled width={getWidthPixel(58)} height={getHeightPixel(22.3)} />
            </div>
            <TitleStyled>
              <NotoText fontSize={getWidthPixel(19)} fontColor={palette.white}>
                홈
              </NotoText>
            </TitleStyled>
            <div className="w-70px">
              <NotificationIconStyled />
            </div>
          </LogoPageStyled>
        </div>
        <MainPageStyled>
          <SearchContainer
            width={getWidthPixel(357)}
            height={getHeightPixel(40)}
            fontSize={getHeightPixel(14)}
            placeHolder="검색어를 입력하세요"
            setFunc={setSearch}
            icon={<SearchIconStyled />}
            searchFunc={getSearchedList}
          />
          <CategoryListContainer
            CategoryList={mockupCategory}
            changeCategory={changeCategory}
            selectedCategory={category}
          />
          <NoticeListContainer
            NoticeList={noticeData}
            changeBookmark={changeBookmark}
            goNoticeDetail={goNoticeDetail}
          />
        </MainPageStyled>
        <BottomNavigationBar />
      </PageStyled>
    );
}

export default MainPage;

const PageStyled = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${palette.crimson};
`;

const LogoPageStyled = styled.div`
  width: 100%;
  height: ${getHeightPixel(59)};
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-basis: 100%;
`;

const TitleStyled = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;
const MainPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: ${getHeightPixel(661)};
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background: ${palette.white};
  border-radius: ${getPixelToPixel(30)} ${getPixelToPixel(30)} 0px 0px;
`;
const NotificationIconStyled = styled(Notification_Icon)`
  width: ${getWidthPixel(16)};
  height: ${getHeightPixel(21.89)};
  margin-right: ${getWidthPixel(24)};
`;
const SearchIconStyled = styled(Search_Icon)`
  width: ${getWidthPixel(21)};
  height: ${getHeightPixel(21)};
`;
const MainLogoStyled = styled(Main_Logo)`
  position: relative;
  left: 0;
  width: ${getWidthPixel(58)};
  height: ${getHeightPixel(22.23)};
  margin-left: ${getWidthPixel(24)};
`;
