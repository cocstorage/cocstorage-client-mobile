import { Tab, Tabs } from '@cocstorage/ui';

function StorageBoardSearchTabs() {
  const handleChange = () => {
    //
  };

  return (
    <Tabs
      onChange={handleChange}
      value={1}
      centered
      fullWidth
      customStyle={{
        width: 'calc(100% + 40px)',
        margin: '0 -20px 12px',
        zIndex: 2,
        '& > div': {
          justifyContent: 'center'
        }
      }}
    >
      <Tab text="게시글" value={1} />
    </Tabs>
  );
}

export default StorageBoardSearchTabs;
