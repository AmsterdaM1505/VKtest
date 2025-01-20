// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';
// import { List, Spin, Button } from 'antd';
// import { repositoryStore } from './repositoryStore';

// const App = observer(() => {
//     useEffect(() => {
//         repositoryStore.loadRepositories();
//     }, []);

//     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//         const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
//         if (scrollHeight - scrollTop === clientHeight && !repositoryStore.isLoading) {
//             repositoryStore.loadRepositories();
//         }
//     };

//     return (
//         <div style={{ display: 'flex', height: '100vh' }}>
//             <div
//                 onScroll={handleScroll}
//                 style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     height: '80vh',
//                     width: '80vw',
//                     border: '1px solid white',
//                     borderRadius: '5px',
//                     overflowY: 'scroll',
//                     padding: '1rem',
//                     backgroundColor: '#fff',
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                 }}
//             >
//                 <List
//                     dataSource={repositoryStore.repositories}
//                     renderItem={(repo) => (
//                         <List.Item
//                             actions={[
//                                 <Button onClick={() => repositoryStore.deleteRepository(repo.id)}>Delete</Button>,
//                             ]}
//                         >
//                             <List.Item.Meta title={repo.name} description={repo.description} />
//                         </List.Item>
//                     )}
//                 />
//                 {repositoryStore.isLoading && <Spin />}
//             </div>
//         </div>
//     );
// });

// export default App;

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { List, Spin, Button, Modal, Input } from 'antd';
import { repositoryStore } from './repositoryStore';

const App = observer(() => {
    const [isEditing, setIsEditing] = useState(false); // Состояние для отображения модального окна
    const [currentRepoId, setCurrentRepoId] = useState<number | null>(null); // ID редактируемого репозитория
    const [newRepoName, setNewRepoName] = useState(''); // Новое название репозитория

    useEffect(() => {
        repositoryStore.loadRepositories();
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && !repositoryStore.isLoading) {
            repositoryStore.loadRepositories();
        }
    };

    const handleEdit = (id: number, currentName: string) => {
        setCurrentRepoId(id);
        setNewRepoName(currentName);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (currentRepoId !== null) {
            repositoryStore.editRepository(currentRepoId, { name: newRepoName });
        }
        setIsEditing(false);
        setCurrentRepoId(null);
        setNewRepoName('');
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
                                <Button onClick={() => handleEdit(repo.id, repo.name)}>Edit</Button>,
                                <Button onClick={() => repositoryStore.deleteRepository(repo.id)}>Delete</Button>,
                            ]}
                        >
                            <List.Item.Meta title={repo.name} description={repo.description} />
                        </List.Item>
                    )}
                />
                {repositoryStore.isLoading && <Spin />}
            </div>

            {/* Модальное окно для редактирования */}
            <Modal
                title="Edit Repository Name"
                open={isEditing}
                onOk={handleSave}
                onCancel={() => setIsEditing(false)}
            >
                <Input
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    placeholder="Enter new repository name"
                />
            </Modal>
        </div>
    );
});

export default App;

