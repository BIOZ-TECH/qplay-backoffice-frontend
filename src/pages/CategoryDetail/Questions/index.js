import React from "react";
import { useNavigate } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { Box, Card, CardContent, CardMedia, ListItem, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import CATEGORY_DETAIL_STRINGS from "../../../resources/strings/category-detail";
import Question from "../../../entities/Question";


const Questions = ({ questions, categoryId }) => {
    const navigate = useNavigate();
  
  const getItemClass = (index) => {
    switch(index) {
      case 0:
        return CATEGORY_DETAIL_STRINGS.FIRST_QUESTION;
      case questions.length:
        return CATEGORY_DETAIL_STRINGS.LAST_QUESTION;
      default:
        return CATEGORY_DETAIL_STRINGS.MIDDLE_QUESTION;
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
          {`${question.answers.length} ${CATEGORY_DETAIL_STRINGS.ANSWER_OPTIONS}`}
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
    <div className="questions" style={{ display: 'flex', flexFlow: 'column'}}>
      <div className="questions-header">
      <h3>{ CATEGORY_DETAIL_STRINGS.QUESTION }</h3>
      <button className="new-question" type="button" onClick={onAddNewQuestion}>
      <FontAwesomeIcon className="mr-2" icon={faAdd} />
        { CATEGORY_DETAIL_STRINGS.NEW_QUESTION }
      </button>
      </div>

      <div style={{ height: '100%'}}>
      {
        questions && questions.length > 0
        && (
          <AutoSizer>
          {({ height, width }) => (
      
                    <FixedSizeList
                    height={height}
                    width={width}
                    itemSize={height/4}
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
    </div>
  );
}

export default Questions;