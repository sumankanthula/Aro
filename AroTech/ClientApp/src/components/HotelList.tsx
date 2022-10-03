import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Col, Container, NavItem, Row } from 'reactstrap';
import { ApplicationState } from '../store';
import * as HotelStore from '../store/Hotel';

// At runtime, Redux will merge together...
type HotelListProps =
    HotelStore.HotelState // ... state we've requested from the Redux store
    & typeof HotelStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class HotelList extends React.PureComponent<HotelListProps> {
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
                {this.renderHotelList()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestHotelList(startDateIndex);
    }


    private navigateToDetails(hotel: HotelStore.Hotel) {
    }

    private renderHotelList() {
        return (
            <div>
                {this.props.hotelList && this.props.hotelList.map((hotel: HotelStore.Hotel) =>
                    <Container>
                        <Link className="text-dark" to={`/hotel-details/${hotel.Id}`}>
                            <Row style={{ border: "1px solid lightslategray", marginBottom: "15px" }}>
                                <Col sm={4}><img style={{ width: "100%", height: "100%" }} src={hotel.Images && hotel.Images[0].Url}
                                    alt={hotel.Name} width="200" height="200" data-testid="image" /></Col>
                                <Col sm={6}>
                                    <Row style={{ marginBottom: "15px" }}>
                                        {hotel.Name}
                                    </Row>
                                    <Row style={{ marginBottom: "15px" }}>
                                        {hotel.Address && `${hotel.Address.City} ${hotel.Address.Country}`}
                                    </Row>
                                    <Row style={{ marginBottom: "15px" }}>
                                        {hotel.RoomCategorey && hotel.RoomCategorey.map((feature: HotelStore.Feature) =>
                                            <Container>
                                                <Row key={feature.Name} style={{ marginBottom: "15px" }}>
                                                    {feature.Name}
                                                </Row>
                                            </Container>
                                        )
                                        }
                                    </Row>

                                </Col>
                                <Col sm={2}>
                                    <label style={{ fontSize: "bold" }}>Price</label> ${hotel.Price}
                                </Col>

                            </Row>
                        </Link>
                    </Container>
                )}
            </div>
        );
    }

    private renderPagination() {
        const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
            </div>
        );
    }
    private renderPageTitle() {
        return (
            //<img src={"https://localhost:44326/images/IMG_0856.JPG"}
            //    alt="Beresford Hotel" width="200" height="200" data-testid="image" />
            <img src={"/images/44358273.webp"
            }
                alt="Beresford Hotel" width="200" height="200" data-testid="image" />

        );
    }

}

export default connect(
    (state: ApplicationState) => state.hotel, // Selects which state properties are merged into the component's props
    HotelStore.actionCreators // Selects which action creators are merged into the component's props
)(HotelList as any); // eslint-disable-line @typescript-eslint/no-explicit-any
