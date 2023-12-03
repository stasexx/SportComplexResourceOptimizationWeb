import { Button, Card, Image } from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

async function getImageUrlById(id: string): Promise<string> {
    try {
      const response = await axios.get(`http://localhost:5002/s3/images/${id}?bucketType=SportComplex`);
      return response.data.mainPhoto;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }


export default observer (function SportComplexDetails(){
    
    const {sportComplexStore} = useStore();
    const {selectedSportComplex: sportComplex, loadSportComplex, loadingInitial} = sportComplexStore;
    const [imageUrl, setImageUrl] = useState<string>('');
    const {id} = useParams()

    useEffect(() => {
      if (id) {
        loadSportComplex(id);
      }
    
      if (!sportComplex) {
        return;
      }
    
      const fetchImageUrl = async () => {
        try {
          const url = await getImageUrlById(id);
          setImageUrl(url);
        } catch (error) {
          // Обробка помилок, якщо потрібно
        }
      };
    
      fetchImageUrl();
    }, [id, loadSportComplex, sportComplex, sportComplex?.id]);

    if (loadingInitial || !sportComplex) return <LoadingComponents/>;

    return(
        <Card>
            <Image src={imageUrl} alt="Sport Complex" />
            <Card.Content>
                <Card.Header>{sportComplex.name}</Card.Header>
                <Card.Meta>
                    <span>{sportComplex.email}</span>
                </Card.Meta>
                <Card.Description>
                    {sportComplex.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group withs='7'>
                    <Button as={Link} to={`/update/sportcomplexes/${sportComplex.id}`} color='pink' content='Edit' />
                    <Button as={Link} to={"/sportcomplexes"} color='blue' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})