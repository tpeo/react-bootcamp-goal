export default function ListItem(props) {
    return (
        <div>
            <li>
                <div className="listItem">
                    {props.task}
                    <div
                        className="icon"
                        onClick={() => deleteFile(file, index)}
                    >
                        😀
                    </div>
                </div>
            </li>
            <style jsx>
                {`
                .listItem {
                    display: flex;
                    flex-direction: row;
                    height: 20px;
                    line-height: 20px;
                    list-style-type: circle;
                }

                .icon {
                    padding-left: 5px;
                    cursor: pointer;
                }

                .icon:hover {
                    opacity: 0.6;
                }
                `}
            </style>
        </div>
    )
}