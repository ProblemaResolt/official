import * as React from "react";
import "../../styles/Header.scss";
import {Header,Avatar,StyledOcticon} from '@primer/react'
interface IProps {
  name: string;
}
const fontSize=2;

export default class PageHeader extends React.Component<IProps> {
  public render() {
    return (
<Header>
  <Header.Item>
    Probrema {this.props.name}
  </Header.Item>
</Header>
    );
  }
}
