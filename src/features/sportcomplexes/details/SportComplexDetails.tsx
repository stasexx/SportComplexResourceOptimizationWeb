import { Grid} from "semantic-ui-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import SportComplexDetailedHeader from "./SportComplexDetailedHeader";

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
        <Grid>
          <Grid.Column width={10}>
            <SportComplexDetailedHeader sportComplexProps={sportComplex} />
          </Grid.Column>
        </Grid>
    )
})