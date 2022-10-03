import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Col, Container, NavItem, Row } from 'reactstrap';
import { ApplicationState } from '../store';
import * as HotelStore from '../store/HotelDetail';

// At runtime, Redux will merge together...
type HotelDetailProps =
    HotelStore.HotelDetailState // ... state we've requested from the Redux store
    & typeof HotelStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ id: string }>; // ... plus incoming routing parameters


class HotelDetail extends React.PureComponent<HotelDetailProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                {this.renderHotelDetail()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const Id = this.props.match.params.id;
        this.props.requestHotelDetails(Id);
    }

    private renderHotelDetail() {
        return (
            <div>
                {
                    <Container>
                        <Row style={{ border: "1px solid lightslategray", marginBottom: "15px" }}>
                            <Col sm={4}>

                                <Row style={{ marginBottom: "15px" }}>
                                    {this.props.hotelDetail && this.props.hotelDetail.Images && this.props.hotelDetail.Images.map((image: HotelStore.Image) =>
                                        <Container>
                                            <Row key={image.Url} style={{ marginBottom: "15px" }}>
                                                <img style={{ width: "100%", height: "100%" }} src={image.Url}
                                                    alt={this.props.hotelDetail && this.props.hotelDetail.Name} width="200" height="200" data-testid="image" />
                                            </Row>
                                        </Container>
                                    )
                                    }
                                </Row>


                            </Col>
                            <Col sm={6}>
                                <Row style={{ marginBottom: "15px" }}>
                                    {this.props.hotelDetail && this.props.hotelDetail.Name}
                                </Row>
                                <Row style={{ marginBottom: "15px" }}>
                                    {this.props.hotelDetail && this.props.hotelDetail.Address && `${this.props.hotelDetail.Address.City} ${this.props.hotelDetail.Address.Country}`}
                                </Row>
                                <Row style={{ marginBottom: "15px" }}>
                                    {this.props.hotelDetail && this.props.hotelDetail.RoomCategorey && this.props.hotelDetail.RoomCategorey.map((feature: HotelStore.Feature) =>
                                        <Container>
                                            <Row key={feature.Name} style={{ marginBottom: "15px" }}>
                                                {feature.Name}
                                            </Row>
                                        </Container>
                                    )
                                    }
                                </Row>
                                <Row style={{ marginBottom: "15px" }}>
                                    {this.props.hotelDetail && this.props.hotelDetail.Features && this.props.hotelDetail.Features.map((feature: HotelStore.Feature) =>
                                        <Container>
                                            <Row key={feature.Name} style={{ marginBottom: "15px" }}>
                                                {feature.Name}
                                            </Row>
                                        </Container>
                                    )
                                    }
                                </Row>
                                <Row style={{ marginBottom: "15px" }}>
                                    {this.props.hotelDetail && this.props.hotelDetail.Description}
                                </Row>

                            </Col>
                            <Col sm={2}>
                                ${this.props.hotelDetail && this.props.hotelDetail.Price}
                            </Col>

                        </Row>
                    </Container>
                }
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.hotelDetail, // Selects which state properties are merged into the component's props
    HotelStore.actionCreators // Selects which action creators are merged into the component's props
)(HotelDetail as any); // eslint-disable-line @typescript-eslint/no-explicit-any
