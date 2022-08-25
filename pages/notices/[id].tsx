import { NoticeContent, NoticeFooter, NoticeHeader } from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import CommentList from '@components/UI/organisms/CommentList';

function Notice() {
  return (
    <GeneralTemplate header={<NoticeHeader />} footer={<NoticeFooter variant="default" />}>
      <NoticeContent />
      <CommentList customStyle={{ margin: '40px 0 20px' }} />
    </GeneralTemplate>
  );
}

export default Notice;
