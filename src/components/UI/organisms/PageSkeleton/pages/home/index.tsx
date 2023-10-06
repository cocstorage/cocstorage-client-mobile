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

function Home() {
  const {
    theme: {
      mode,
      palette: {
        text,
        secondary: { red }
      }
    }
  } = useTheme();

  return (
    <GeneralTemplate
      header={<Header />}
      footer={<BottomNavigation disableOnBoarding />}
      disableFlexible={false}
    >
      <Skeleton
        width="100%"
        height={56}
        disableAspectRatio
        round={12}
        customStyle={{ marginTop: 14 }}
      />
      <Box
        component="section"
        customStyle={{
          margin: '32px -20px 0'
        }}
      >
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
        <IssueKeywordList>
          {Array.from({ length: 4 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <IssueKeywordCardSkeleton key={`issue-keyword-skeleton-${index}`} />
          ))}
        </IssueKeywordList>
      </Box>
      <Box component="section" customStyle={{ margin: '30px -20px 0' }}>
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
      <Box component="section" customStyle={{ margin: '30px -20px 0' }}>
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
    </GeneralTemplate>
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

const IssueKeywordList = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 28px;
  margin-top: 12px;
  padding: 0 20px;
  overflow: hidden;
`;

export default Home;
