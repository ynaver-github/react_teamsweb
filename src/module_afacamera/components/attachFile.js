import { Container, Grid, Label, Button, List, Segment } from "semantic-ui-react";
import lgModule from "./css/asform.css"

const AttachFileLayout = () => (
    // <Container>
        <div class="ui form">
                <div class="ui form">
                    <Container text style={{ marginTop: '1em' }}>
                        <Segment>
                        <List bulleted>
                            <List.Item>첨부파일은 최대 3개까지 가능하며, 최대 20MB까지 업로드 가능합니다.</List.Item>
                            <List.Item>첨부파일 이름은 특수기호(? ! , . &amp; ^ ~ )를 사용할 수 없으며, 첨부 가능 확장자는 아래와 같습니다.</List.Item>
                            <List.Item>이미지 파일 : jpg, jpeg, gif, png</List.Item>
                            <List.Item>영상 파일 : mkv, mp4, m4v, flv, avi, wmv, mov, m4r </List.Item>
                            <List.Item>아이폰은 보관함에 저장된 동영상만 업로드 가능합니다.</List.Item>
                        </List>
                        </Segment>
                    </Container>
                </div>

        </div>
    // </Container>
)

export default AttachFileLayout;