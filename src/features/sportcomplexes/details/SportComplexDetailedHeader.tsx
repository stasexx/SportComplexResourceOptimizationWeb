import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {SportComplex} from "../../../app/models/sportcomplex";
import { useStore } from '../../../app/stores/store';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const sportComlplexImageStyle = {
    filter: 'brightness(90%)'
};

async function getImageUrlById(id: string): Promise<string> {
    try {
      const response = await axios.get(`http://localhost:5002/s3/images/${id}?bucketType=SportComplex`);
      return response.data.mainPhoto;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }

const sportComlplexImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};



interface Props {
    sportComplexProps: SportComplex
}

export default observer (function ActivityDetailedHeader({sportComplexProps}: Props) {
    const {userStore: {user, logout,isLoggedIn}} = useStore();
    const {sportComplexStore} = useStore();
    const {selectedSportComplex: sportComplex, loadSportComplex, loadingInitial} = sportComplexStore;
    const [imageUrl, setImageUrl] = useState<string>('');
    const {id} = useParams()

    useEffect(() => {
      if (id) {
        loadSportComplex(sportComplexProps.id);
      }
    
      if (!sportComplex) {
        return;
      }
    
      const fetchImageUrl = async () => {
        try {
          const url = await getImageUrlById(sportComplexProps.id);
          if(url){
            setImageUrl(url);
          } else {
            setImageUrl('/assets/image_not_jound.png');
          }
        } catch (error) {
          // Обробка помилок, якщо потрібно
        }
      };
    
      fetchImageUrl();
    }, [id, loadSportComplex, sportComplex, sportComplex?.id, sportComplexProps]);


    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={imageUrl} fluid style={sportComlplexImageStyle}/>
                <Segment style={sportComlplexImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={sportComplexProps.name}
                                    style={{color: 'white'}}
                                />
                                <p>{sportComplexProps.rating}</p>
                                <p>
                                    Address <strong>{sportComplexProps.city}, {sportComplexProps.address}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            {isLoggedIn ? (
                user?.roles.includes('Owner') || user?.roles.includes('Admin') ? (
                  <Segment clearing attached='bottom'>
                  <Button as={Link} to={`/sportcomplexes/${sportComplexProps.id}/services`} color='teal'>View Services</Button>
                  <Button as={Link} to={`/update/sportcomplexes/${sportComplexProps.id}`} color='pink' content='Edit'>
                      Manage Sport Complex
                  </Button>
              </Segment>
                ) : (
                    user?.roles.includes('User') ? (
                      <Segment clearing attached='bottom'>
                      <Button as={Link} to={`/sportcomplexes/${sportComplexProps.id}/services`} color='teal'>View Services</Button>
                  </Segment>
                        ) : null
                    )
                ) : (
                  <Segment clearing attached='bottom'>
                  <Button as={Link} to={`/sportcomplexes/${sportComplexProps.id}/services`} color='teal'>View Services</Button>
              </Segment>
                )}
                
            <Segment clearing attached='bottom'>
                <p>
                    Description: <strong>{sportComplexProps.description}</strong>
                </p>
                <p>
                    Operating Hours: <strong>{sportComplexProps.operatingHours}</strong>
                </p>
            </Segment>


        </Segment.Group>
    )
})