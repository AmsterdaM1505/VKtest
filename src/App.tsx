import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List, Spin, Button } from 'antd';
import { repositoryStore } from './repositoryStore';

const App = observer(() => {
    useEffect(() => {
        repositoryStore.loadRepositories();
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && !repositoryStore.isLoading) {
            repositoryStore.loadRepositories();
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div
                onScroll={handleScroll}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: '80vh',
                    width: '80vw',
                    border: '1px solid white',
                    borderRadius: '5px',
                    overflowY: 'scroll',
                    padding: '1rem',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <List
                    dataSource={repositoryStore.repositories}
                    renderItem={(repo) => (
                        <List.Item
                            actions={[
                                <Button onClick={() => repositoryStore.deleteRepository(repo.id)}>Delete</Button>,
                            ]}
                        >
                            <List.Item.Meta title={repo.name} description={repo.description} />
                        </List.Item>
                    )}
                />
                {repositoryStore.isLoading && <Spin />}
            </div>
        </div>
    );
});

export default App;
