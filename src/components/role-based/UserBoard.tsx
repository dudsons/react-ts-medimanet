import {useState, useEffect} from 'react'
import UserService from '../../security/services/user.service';

const AdminBoard = () => {
    const [content, setContent] = useState<any>('');

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response:any) => {
                setContent(response);
            },
            (error: any) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        )
    }, []);


    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
}

export default AdminBoard;
