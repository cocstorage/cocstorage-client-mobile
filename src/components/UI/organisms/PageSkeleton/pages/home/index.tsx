import {
  Box,
  Button,
  Flexbox,
  IconButton,
  Skeleton,
  Tag,
  Typography,
  useTheme
} from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled from '@emotion/styled';

import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { BottomNavigation, Header } from '@components/UI/molecules';
import IssueKeywordCardSkeleton from '@components/UI/molecules/IssueKeywordCard/IssueKeywordCardSkeleton';
import StorageBoardCardSkeleton from '@components/UI/molecules/StorageBoardCard/StorageBoardCardSkeleton';
import {
  List as IssueList,
  StyledIssueKeywordRank
} from '@components/UI/organisms/IssueKeywordRank/IssueKeywordRank.styles';

function Home() {
  return (
    <GeneralTemplate
      header={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <Header />
        </Box>
      }
      footer={
        <Box style={{ position: 'relative', zIndex: 10 }}>
          <BottomNavigation disableOnBoarding />
        </Box>
      }
      disableFlexible={false}
    >
      <Skeleton
        width="100%"
        height={56}
        disableAspectRatio
        customStyle={{ marginTop: 14, borderRadius: 12 }}
      />
      <IssueKeywordRank />
      <IndexBestStorageBoardList />
      <IndexWorstStorageBoardList />
      <IndexLatestStorageBoardList />
    </GeneralTemplate>
  );
}

function IssueKeywordRank() {
  const {
    theme: {
      mode,
      palette: { text }
    }
  } = useTheme();

  return (
    <StyledIssueKeywordRank css={{ marginTop: 32 }}>
      <Flexbox justifyContent="space-between" customStyle={{ margin: '0 20px' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          customStyle={{ position: 'relative', zIndex: '7' }}
        >
          지금 막 뜨고 있어요!
        </Typography>
        <Button
          variant="transparent"
          size="small"
          startIcon={
            <Icon name="CaretSemiDownOutlined" width={16} height={16} color={text[mode].text1} />
          }
          disabled
          customStyle={{
            color: text[mode].text1,
            zIndex: '7'
          }}
        >
          펼치기
        </Button>
      </Flexbox>
      <IssueList>
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <IssueKeywordCardSkeleton key={`issue-keyword-skeleton-${index}`} />
        ))}
      </IssueList>
    </StyledIssueKeywordRank>
  );
}

function IndexBestStorageBoardList() {
  return (
    <Box component="div" customStyle={{ margin: '30px -20px 0' }}>
      <Flexbox
        alignment="center"
        justifyContent="space-between"
        gap={4}
        customStyle={{ margin: '0 20px', position: 'relative', zIndex: '7' }}
      >
        <Flexbox alignment="center" justifyContent="space-between" gap={8}>
          <Tag
            variant="semiAccent"
            startIcon={<Icon name="ThumbsUpOutlined" width={14} height={14} />}
            customStyle={{
              padding: '0 6px',
              height: 21,
              borderRadius: 4,
              fontSize: 12
            }}
          >
            베스트
          </Tag>
          <Typography variant="h4" fontWeight="bold">
            ㅇㄱㄹㅇ
          </Typography>
        </Flexbox>
        <IconButton>
          <Icon name="CaretSemiRightOutlined" />
        </IconButton>
      </Flexbox>
      <List>
        {Array.from({ length: 5 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <StorageBoardCardSkeleton key={`index-best-storage-board-${index}`} variant="normal" />
        ))}
      </List>
    </Box>
  );
}

function IndexWorstStorageBoardList() {
  const {
    theme: {
      palette: {
        secondary: { red }
      }
    }
  } = useTheme();

  return (
    <Box component="div" customStyle={{ margin: '30px -20px 0' }}>
      <Flexbox
        alignment="center"
        justifyContent="space-between"
        gap={4}
        customStyle={{ margin: '0 20px', position: 'relative', zIndex: '7' }}
      >
        <Flexbox alignment="center" justifyContent="space-between" gap={8}>
          <Tag
            variant="semiAccent"
            startIcon={<Icon name="ThumbsDownOutlined" width={14} height={14} color={red.main} />}
            customStyle={{
              padding: '0 6px',
              height: 21,
              borderRadius: 4,
              fontSize: 12,
              backgroundColor: red.bg,
              color: red.main
            }}
          >
            워스트
          </Tag>
          <Typography variant="h4" fontWeight="bold">
            와 선 넘네
          </Typography>
        </Flexbox>
        <IconButton>
          <Icon name="CaretSemiRightOutlined" />
        </IconButton>
      </Flexbox>
      <List>
        {Array.from({ length: 5 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <StorageBoardCardSkeleton key={`index-worst-storage-board-${index}`} variant="normal" />
        ))}
      </List>
    </Box>
  );
}

function IndexLatestStorageBoardList() {
  return (
    <Box component="section" customStyle={{ margin: '32px 0 20px' }}>
      <Typography
        variant="h4"
        customStyle={{ position: 'relative', zIndex: '7' }}
        fontWeight="bold"
      >
        최신 게시글
      </Typography>
      <Box customStyle={{ marginTop: 20 }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <StorageBoardCardSkeleton
            // eslint-disable-next-line react/no-array-index-key
            key={`index-latest-storage-board-${index}`}
            customStyle={{ marginTop: index === 0 ? undefined : 18 }}
          />
        ))}
      </Box>
    </Box>
  );
}

const List = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  column-gap: 12px;
  margin-top: 14px;
  padding: 0 20px;
  overflow-x: auto;
`;

export default Home;
