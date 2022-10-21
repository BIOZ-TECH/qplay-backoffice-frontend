import React, { useEffect, useState } from "react";

import "./styles.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, TextField } from "@mui/material";
import QuestionScreen from "./QuestionScreen";
import FeedbackEdition from "./FeedbackEdition";
import Question from "../../entities/Question";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionForm = ({ setBreadcrumb, setAction}) => {
  const { id: questionId, categoryId } = useParams();

  const [question, setQuestion] = useState(new Question({}));
  const [statementType, setStatementType] = useState("only-text");
  const [statementImage, setStatementImage] = useState(null);

  useEffect(() => {
    setBreadcrumb([
      {
        name: 'Categorías',
        route: '/',
      },
      {
        name: 'Categoría 1: Categoria nombre',
        route: `/category/${categoryId}`
      },
      {
        name: ( questionId ? 'Editar pregunta' : 'Nueva pregunta' ),
      }
    ]);
    setAction({
      name: `Guardar ${ questionId ? ' cambios' : '' }`,
      icon: faFloppyDisk,
      onActionClick: onSaveQuestionClick,
    });
  }, []);

  /*useEffect(() => {
    async function fetchCategory() {
      const response = await categoryServices.getCategory(0, categoryId);

      setCategory(new Category(response.data));
    };

    fetchCategory();
  }, [id]);*/

  const onStatementImageBlur = (e) => {
    const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
    const inputValue = e.target.value;

    if (urlImageRegex.test(inputValue)) {
      const newQuestion = new Question({ ...question, image: inputValue });
      setQuestion(newQuestion);
    }
  }

  const onSaveQuestionClick = () => {
    
  };

  return (
    <>
    <Card className="row new-question-header">
    <div>NUEVA PREGUNTA</div>
    <button className="save-question" type="button" onClick={onSaveQuestionClick}>
      <FontAwesomeIcon className="mr-2" icon={faFloppyDisk} />
        Guardar
      </button>
    </Card>
        <div className="question-container">
    <QuestionScreen question={question} />
    <Card className="question-card">
    <div className="question">
    <TextField id="statement-image-input" label="Imágen de enunciado (opcional)" variant="outlined"
          type="url"
          onInput={onStatementImageBlur}
          className="image-statement-input"/>
    <FeedbackEdition />
    </div>
    </Card>
    
    </div>
    </>
  );
}

export default QuestionForm;