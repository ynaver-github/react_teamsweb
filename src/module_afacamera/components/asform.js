import React, { useEffect, useState, Component } from 'react';
import "./css/asform.css";
import { useLocation } from 'react-router-dom';
import { Flex } from './styled-components';
import { Divider, Image, Container, Header, Label, Select, Segment, Button, Menu, Icon, Grid, Comment, Form } from 'semantic-ui-react';
import AttachFile from './attachFile';
import FixedMenu from './fixed';
import HomepageHeader from './homepageHeader';
import Comment1 from './comment';
import Comment2 from './commentImage';
import Comment3 from './comment119';

const DividerExampleDivider = () => <Divider />

// const productNumberOptions = [
//   { key: 'F7M4ZYP31', value: 'F7M4ZYP31', text: 'F7M4ZYP31' },
//   { key: 'T16BVG', value: 'T16BVG', text: 'T16BVG' },
//   { key: 'F4HC', value: 'F4HC', text: 'F4HC' },
//   { key: 'T20HVD', value: 'T20HVD', text: 'T20HVD' },
//   { key: 'T22HVD', value: 'T22HVD', text: 'T22HVD' },
//   { key: 'T20WT', value: 'T20WT', text: 'T20WT' },
//   { key: 'T15DTA', value: 'T15DTA', text: 'T15DTA' },
//   { key: 'T20MT', value: 'T20MT', text: 'T20MT' },
//   { key: 'T15MTA', value: 'T15MTA', text: 'T15MTA' },
//   { key: 'T15WUA', value: 'T15WUA', text: 'T15WUA' },
//   { key: 'T20BVD', value: 'T20BVD', text: 'T20BVD' },
// ]

// const productOptions = [
//   { key: '일반 세탁기', value: '일반 세탁기', text: '일반 세탁기' },
//   { key: '드럼 세탁기', value: '드럼 세탁기', text: '드럼 세탁기' },
//   { key: '스타일러', value: '스타일러', text: '스타일러' },
// ]


function CommentLayout(props) {
  let url = "https://www.lge.co.kr/support/solutions-1001208";
  let id = props.id;

  if (id == 1) {
    url = "https://www.lge.co.kr/support/solutions-20151793015067";
    return <Comment1></Comment1>
  } else if (id == 2) {
    url = "https://www.lge.co.kr/support/solutions-20150266201321";
    return <Comment2></Comment2>
  } else if (id == 3) {
    url = "https://www.lge.co.kr/support/solutions-20150734663247";
    return <Comment3></Comment3>
  }
  console.log("id : " + id + ", url : " + url);

  return  (
  <div>
  <Comment.Group>
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>상담원 Matt</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>
          아래와 같이 해결해보세요. <iframe src={url} width="100%" height="844px">
            <p>아이프레임 지원 않는 브라우저는 개나 줘버려!</p>
          </iframe>
          {/* <button onClick={()=>{window.open("https://www.daisomall.co.kr")}}></button> */}
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Header as='h3' dividing>
      Comments
    </Header>
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
  </div>
  )
}

function Navi(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<div class="item"><div class="content">
      <a class="header" id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></div>
    </div>)
  }
  const mode = props.mode;
  if (mode == 'CREATE') {
    return <div />;
  }
  return <nav>
    <div class="ui segment">
      <Label>과거 문의 내역</Label>
      <div class="ui relaxed divided list">
        {lis}
      </div>
    </div>
  </nav>;
}

function Article(props) {
  return <Container text style={{ marginTop: "2em" }}>
    {/* <div class="ui raised very padded text container segment"> */}
    <div class="ui form">
      <form>
        <div class="field">
          <Header as='h4' dividing>
            문의 유형
          </Header>통돌이 세탁기 패널 de에러
          {/* <h2 class="ui header">{props.title}</h2> */}
          {/* <div class="ui divider"></div> */}
          <Header as='h4' dividing>
            문의 제품
          </Header><p>{props.product}</p>
          <Header as='h4' dividing>
            모델명
          </Header><p>{props.number}</p>
          <Header as='h4' dividing>
            문의 내용
          </Header>{props.body}
          <Header as='h4' dividing>
            첨부 파일
          </Header><VideoUploader mode={props.mode} videoData={props.videoData} />
        </div>
      </form>
    </div>
    {/* </div> */}
  </Container>
}

function SelectTest(props) {
  const productNumberList = ['F7M4ZYP31', 'T16BVG', 'F4HC', 'T20HVD', "T22HVD", "T20WT", "T15DTA", "T20MT", "T15MTA", "T15WUA", "T20BVD", "T15DUA"]
  const productList = ['일반 세탁기', '드럼 세탁기', '스타일러']
  
  let name = props.name;
  let defaultProductValue = props.defaultProductValue;
  let defaultNumberValue = props.defaultNumberValue;
  const [product, setProduct] = useState(defaultProductValue);
  const [number, setNumber] = useState(defaultNumberValue);

  console.log("name : " + name + ", defaultProductValue: " + defaultProductValue + ", defaultNumberValue :" + defaultNumberValue)
  if (name == 'product') {
    return (
      <select name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
        {productList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <select name="number" value={number} onChange={(e) => setNumber(e.target.value)}>
        {productNumberList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }
}
function Create(props) {
  const mode = props.mode;
  const videoData = props.videoData;
  const resultText = props.resultText;
  const [title, setTitle] = useState(props.title);
  return <Container>
    <div class="ui form">
      <div class="tit-wrap">
        <h3 className="tit">문의 내용을 입력해주세요.</h3>
      </div>
      <p></p>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        const product = event.target.product.value;
        const number = event.target.number.value;
        console.log("CREATE: title : " + title + ", body : " + body + ", product : " + product + ", number : " + number)
        props.onCreate(title, body, product, number);
      }}>
        <p>
          <div class="field">
            <label>문의 유형 <Label pointing='below'> 수정하려면 클릭하세요.</Label></label>

            <div class="fields">
              <div class="twelve wide field">
                <input className="inputTypeSelect" type="text" name="title" placeholder="문의 유형을 입력하세요" value={"통돌이 세탁기 패널 de에러"} onChange={event => {
                  console.log("CREATE. select type  : " + title + ", update : " + event.target.value)
                  setTitle(event.target.value);
                }} /></div>
              <div class="four wide field"></div>
            </div>
          </div>
        </p>
        <div class="two fields">

          <div class="field">
            <label>제품 유형</label>
            <SelectTest name={'product'} defaultProductValue={"LG 통돌이 세탁기"}></SelectTest>
          </div>
          <div class="field">
            <label>모델명</label>
            {/* <Select placeholder='Product' options={productNumberOptions} name="number" defaultValue={"T16BVG"} /> */}
            <SelectTest name={'number'} defaultNumberValue={"T15DUA"}></SelectTest>
          </div>
        </div>
        <p><div class="field">
          <label>문의 내용</label>
          <p><textarea className="textarea" name="body" id="inquiryContent"
            placeholder="개인정보 보호를 위해 내용 입력란에 고객님의 주민등록번호, 휴대폰번호와 같은 개인정보를 입력하지 마시기 바랍니다."
            maxlength="1000" data-limit="1000" data-count-target="#txt-count2" data-error-msg="내용을 입력해주세요."
            data-required="true" required="" ui-modules="TextControl" aria-describedby="inquiryContentError" rows="10"></textarea>
          </p>
        </div>
        </p>
        <Divider horizontal>
        <Header as='h4'>
          <Icon name='tag' />
          ATTACH
        </Header>
      </Divider>
        <Segment secondary>
        카메라가 켜져 있는 동안의 영상을 자동으로 첨부하였습니다. 추가로 첨부하고 싶은 파일이 있다면 첨부하세요.
      </Segment>
        <VideoUploader mode={props.mode} videoData={props.videoData} />
        <Attach videoData={videoData} mode={mode}/>
        <Container text style={{marginTop:"1em"}}><div class="ui container" className="btnGroup"><button type="submit" value="취소" className="btnGray"><span>취소</span></button>
          <button type="submit" value="확인" className="btn2"><span>문의</span></button></div></Container>
      </form>

    </div>
  </Container>
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [product, setProduct] = useState(props.product);
  const [number, setNumber] = useState(props.number);


  return <Container text style={{ marginTop: "2em" }}><div class="ui form">
    <div class="tit-wrap">
      <h2 className="tit">문의 내용을 수정해주세요.</h2>
    </div>
    <p></p>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      const product = event.target.product.value;
      const number = event.target.number.value;
      console.log("UPDATE: title : " + title + ", body : " + body + ", product : " + product + ", number : " + number)
      setProduct(product);
      setNumber(number);
      props.onUpdate(title, body, product, number);
    }}>
      <p>
        <div class="field">
          <label>문의 유형</label>
          <div class="fields">
            <div class="twelve wide field">
              <input className="inputTypeSelect" type="text" name="title" value={"통돌이 세탁기 패널 de에러"} onChange={event => {
                console.log("UPDATE. select type  : " + event.target.value)
                setTitle(event.target.value);
              }} /></div>
            {/* <div class="four wide field"><Label pointing='left'>수정하려면 클릭하세요!</Label></div> */}
          </div>
        </div>
      </p>
      <div class="two fields">

        <div class="field">
          <label>제품 유형</label>
          <SelectTest name={'product'} defaultProductValue={"LG 통돌이 세탁기"}></SelectTest>
        </div>
        <div class="field">
          <label>Product</label>
          <SelectTest name={'number'} defaultNumberValue={"T15DUA"}></SelectTest>
        </div>
      </div>
      <p><div class="field">
        <label>문의 내용</label>
        <p><textarea className="textarea" name="body" id="inquiryContent"
          placeholder="개인정보 보호를 위해 내용 입력란에 고객님의 주민등록번호, 휴대폰번호와 같은 개인정보를 입력하지 마시기 바랍니다."
          maxlength="1000" data-limit="1000" data-count-target="#txt-count2" data-error-msg="내용을 입력해주세요."
          data-required="true" required="" ui-modules="TextControl" aria-describedby="inquiryContentError" rows="10" value={body} onChange={event => {
            setBody(event.target.value);
          }}></textarea>
        </p>
      </div>
      </p>

      <Container text style={{marginTop:"2em"}}><div class="ui container" className="btnGroup"><button type="submit" value="취소" className="btnGray"><span>취소</span></button>
        <button type="submit" value="확인" className="btn2"><span>확인</span></button></div></Container>

    </form>
  </div>
  </Container>

}

function NeedAttach(props) {
  const videoData = props.videoData;
  const [fileBlobs, setFileBlobs] = useState([videoData]);
  const plusBox = {
    width: '160px',
    height: '160px',
    border: '1px solid lightgray',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '3rem',
    userSelect: 'none',
  };

  //jh.ha compile_error fix start
  const [videoURL, setVideoURL] = useState([]);

  const generateVideoThumbnail = (url) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = url;
      video.playsInline = true;
      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth / 3;
        canvas.height = canvas.width;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.width);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };
  //jh.ha compile_error fix end
  
  const getVideoFiles = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/mp4,video/x-m4v,video/*, image/*";
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files;
      const copyFileBlobs = fileBlobs.slice();
      copyFileBlobs.push(file);
      setFileBlobs(copyFileBlobs);
      const video = new Blob(file, { type: "video/mp4,video/x-m4v,video/*, image/*" });
      const fileURL = URL.createObjectURL(video);
      generateVideoThumbnail(fileURL).then((thumbnail) => {
        let copyData = videoURL.slice();
        copyData.push({ video: fileURL, thumbnail: thumbnail });
        setVideoURL(copyData);
      });
    });
    fileInput.click();

  };
  return <div> <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>
        <div style={plusBox} onClick={getVideoFiles}>
          <Image fluid label={{ as: 'a', corner: 'left', icon: 'plus' }} src='https://www.lge.co.kr/lg5-common/images/icons/icon-no-image.svg' />
        </div>
      </Grid.Column>
      <Grid.Column>
        <div style={plusBox} onClick={getVideoFiles}>
          <Image fluid label={{ as: 'a', corner: 'left', icon: 'plus' }} src='https://www.lge.co.kr/lg5-common/images/icons/icon-no-image.svg' />
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    <AttachFile />
  </div>;
}

class AfterAttach extends Component {
  render() {
    return <h1>Please sign up.</h1>;
  }
}

function Attach(props) {
  const mode = props.mode;
  if (mode == 'CREATE') {
    return <NeedAttach videoData={props.videoData} />;
  }
  return <AfterAttach />;
}

function VideoUploader(props) {

  const [videoURL, setVideoURL] = useState([]);

  const videoBox = {
    // width: '160px',
    // height: '160px',
    border: '1px solid lightgray',
  };
  const generateVideoThumbnail = (url) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = url;
      video.playsInline = true;
      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth / 3;
        canvas.height = canvas.width;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.width);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };
  useEffect(() => {
    const video = URL.createObjectURL(props.videoData);
    generateVideoThumbnail(video).then((thumbnail) => {
      console.log(thumbnail)
      let copyData = videoURL.slice();
      copyData.push({ video: video, thumbnail: thumbnail });
      setVideoURL(copyData);
    });
  }, []);

  return (
    <>
      {videoURL.map((data) => (
        <div style={videoBox}>
          <a href={data.video}>
            <img style={{ width: '100%', height: '100%' }} src={data.thumbnail} />
          </a>
        </div>
      )
      )
      }

      {/* <button type='submit'>제출</button> */}
    </>
  );
}


function ASForm() {
  const location = useLocation();
  const videoData = location.state.videoData;
  const resultText = location.state.aiResult;
  console.log(videoData);
  console.log("after : ai result : " + resultText);

  const [mode, setMode] = useState('CREATE');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: '건조기에서 소리가 안나와요', body: '사용하다보니까 건조기 버튼은 눌리는데 소리가 안들려요. 부품을 갈아야되는거에요?', product: '의류 건조기', number: 'RN1044A' },
    { id: 2, title: '건조기 도어 열림 동작 멈춤', body: '건조중에 건조물을 빼야할게 있어서 문을 열었는데 드럼이 계속 돌아가요', product: '의류 건조기', number: 'RN1044E' },
    { id: 3, title: '세탁기 물이 안멈춰요.', body: '세탁기에서 물이 계속 나와요. 원래 어느 정도 물이 차면 멈춰야 하잖아요. \n 근데, 멈추지 않아서 넘칠 것 같아서 잠갔거든요.\n안 그러다 갑자기 이러는데.... 수리 어떻게 해야하져?', product: '일반 세탁기', number: 'F7M4ZYP31' },
  ])

  let content = null;
  let contentList = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {
    let title, body, product, number = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        product = topics[i].product;
        number = topics[i].number;
      }
    }

    contentList = <Article title={title} body={body} product={product} number={number} videoData={videoData}></Article>
    contextControl = <Container text style={{ marginTop: '2em' }}><div class="ui container" className="btnGroup">

      <Segment secondary>
        <Icon name='comment alternate' />
        문의 하신 내용이 접수 되었습니다. 최대한 빠른 시일내에 답변 드리겠습니다.
      </Segment>
      <button type="submit" value="취소" className="btnGray"><span>취소</span></button>
      <button type="submit" value="확인" className="btn2" onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}><span>수정</span></button></div></Container>

  } else if (mode == 'HISTORY') {
    let title, body, product, number = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        product = topics[i].product;
        number = topics[i].number;
      }
    }

    contentList = <Article title={title} body={body} product={product} number={number} videoData={videoData}></Article>
    contextControl = <div><Container text style={{ marginTop: '2em' }}><div class="ui container" className="btnGroup">
      <div>        <Divider horizontal>
        <Header as='h4'>
          <Icon name='comments' />
          ANSWER
        </Header>
      </Divider>
      </div></div></Container><CommentLayout id={id}></CommentLayout></div>

  } else if (mode == 'CREATE') {
    let title, body, product, number = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        product = topics[i].product;
        number = topics[i].number;
      }
    }
    content = <Create mode={mode} videoData={videoData} title={title} resultText={resultText} onCreate={(_title, _body, _product, _number) => {
      console.log("Create title : " + _title + ", result : " + resultText)
      const newTopic = { id: nextId, title: resultText, body: _body, product: _product, number: _number }
      const newTopics = [...topics]
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = newTopic;
          break;
        }
      }
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>

  } else if (mode === 'UPDATE') {
    let title, body, product, number = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        product = topics[i].product;
        number = topics[i].number;
      }
    }
    content = <Update title={title} body={body} product={product} number={number} onUpdate={(_title, _body, _product, _number) => {
      const updateTopic = { id: id, title: _title, body: _body, product: _product, number: _number }
      const newTopics = [...topics]
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <FixedMenu></FixedMenu>
      <HomepageHeader></HomepageHeader>

      <Container text style={{ marginTop: '2em' }}>

        <Menu tabular>
          <Menu.Item
            name='문의 하기'
            onClick={event => {
              event.preventDefault();
              setMode('CREATE');
            }}
            active={mode === 'CREATE'}
          />
          <Menu.Item
            name='문의 내역'
            active={mode === 'READ'}
            onClick={event => {
              event.preventDefault();
              setMode('READ');
            }}
            onChangeMode={(_id) => {
              setMode('READ');
              setId(_id);
            }}
          />
        </Menu>
      </Container>
      <Container text style={{ marginTop: '2em' }}>
        <Navi mode={mode} topics={topics} onChangeMode={(_id) => {
          setMode('HISTORY');
          setId(_id);
        }
        }></Navi>
      </Container>
      <Container>
        {content}
        {contentList}
        {contextControl}
      </Container>


    </div>

  )
}


export default ASForm;
