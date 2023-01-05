import React, {Component} from 'react'
import {Container, Menu, Segment, Sidebar, Header, Button, Icon} from 'semantic-ui-react'

const HomepageHeading = () => (
  <Container text style={{ marginTop: '4em' }}>
    <Header
      as='h3'
      content='제품 문제해결'
      inverted
      style={{
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: '1.5em',
      }}
    />
    <Header
      as='h4'
      content='제품에 대한 문제를 빠르게 진단하고 해결할 수 있도록 도와드리겠습니다.'
      inverted
      style={{
        fontWeight: 'normal',
        marginTop: '0.5em',
      }}
    />
  </Container>
)

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <div>
      <Sidebar.Pushable>
        {/* <Sidebar
          as={Menu}
          animation='overlay'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar> */}

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 200, padding: '1em 0em' }}
            vertical
          >
            {/* <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container> */}
            <HomepageHeading />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    )
  }
}

export default MobileContainer;