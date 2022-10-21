import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import Question from "../../../entities/Question";
import { Box, Card, CardContent, CardMedia, ListItem, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const Questions = ({ questions, categoryId }) => {
    const navigate = useNavigate();
  
  const getItemClass = (index) => {
    switch(index) {
      case 0:
        return 'first-question';
      case questions.length:
        return 'last-question';
      default:
        return 'middle-question';
    }
  }
  
  const renderRow = (props) => {
    const { index, style } = props;
    const question = new Question(questions[index]);
  
    return (
      <ListItem style={style} className={`question ${getItemClass(index)}`} key={index} component="div" disablePadding>
      <Card className="question-item cursor-pointer" onClick={() => navigate(`/category/${categoryId}/question/${question.id}`)}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="h5" className='question-item-title' component="div">
        {question.statement}
        </Typography>
        <Typography color="text.secondary">
          {question.answers.length} opciones de respuesta
        </Typography>
            </CardContent>
            </Box>
  
      <CardMedia className='category-icon ml-auto'>
      <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </CardMedia>
    </Card>
      </ListItem>
    );
  }

  const onAddNewQuestion = () => {
    navigate(`/category/${categoryId}/question/new`);
  }

  return (
    <div className="questions">
      <div className="questions-header">
      <h3>Preguntas</h3>
      <button className="new-question" type="button" onClick={onAddNewQuestion}>
      <FontAwesomeIcon className="mr-2" icon={faAdd} />
        Nueva pregunta
      </button>
      </div>
      
          {
        questions && questions.length > 0
        && (
          <AutoSizer>
          {({ height, width }) => (
      
                    <FixedSizeList
                    height={height}
                    width={width}
                    itemSize={height/5}
                    itemCount={questions.length}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                  
                  )}
                  </AutoSizer>
        )
      }
    </div>
  );
}

export default Questions;