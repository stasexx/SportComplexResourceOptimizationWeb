import { Button, Card, Image } from "semantic-ui-react";
import { SportComplex } from "../../../app/models/sportcomplex";
import axios from "axios";
import { useEffect, useState } from "react";

async function getImageUrlById(id: string): Promise<string> {
    try {
      const response = await axios.get(`http://localhost:5002/s3/images/${id}?bucketType=SportComplex`);
      return response.data.mainPhoto;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }

interface Props 
{
    sportComplex: SportComplex;
    cancelSelectSportCompex: () => void;
    openForm: (id: string) => void;
}

export default function SportComplexDetails({sportComplex, cancelSelectSportCompex, openForm}: Props){
    
    const [imageUrl, setImageUrl] = useState<string>('');
    console.log("ID"+sportComplex.id)

    useEffect(() => {
        const fetchImageUrl = async () => {
          try {
            const url = await getImageUrlById(sportComplex.id);
            setImageUrl(url);
          } catch (error) {
            // Обробка помилок, якщо потрібно
          }
        };
    
        fetchImageUrl();
      }, [sportComplex.id]);

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
                <Button.Group withs='2'>
                    <Button onClick={() => openForm(sportComplex.id)} basic color='pink' content='Edit' />
                    <Button onClick={cancelSelectSportCompex} basic color='blue' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}