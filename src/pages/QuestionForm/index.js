import React, { useEffect, useState } from "react";

import "./styles.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, TextField } from "@mui/material";
import QuestionScreen from "./QuestionScreen";
import FeedbackEdition from "./FeedbackEdition";
import Question from "../../entities/Question";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionDetailTabs from "../QuestionDetail/QuestionDetailTabs";
import questionServices from "../../services/question";
import Feedback from "../../entities/Feedback";
import InflatedFeedback from "../../entities/InflatedFeedback";
import categoryServices from "../../services/category";
import Category from "../../entities/Category";

const QuestionForm = ({ setBreadcrumb, setAction}) => {
  const { id: questionId, categoryId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [statementType, setStatementType] = useState("only-text");
  const [statementImage, setStatementImage] = useState(null);
  const [category, setCategory] = useState(null)
  const [oldQuestion, setOldQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [inputValues, setInputValues] = useState({
    statementImageInput: '',
    answersInput: [],
    statementInput: '',
    feedbackInput: {},
  });
  const {
    statementImageInput,
    answersInput,
    statementInput,
    feedbackInput,
  } = inputValues;

  const onTabClick = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    async function fetchQuestion() {
      let questionData = {};

      const responseCategory = await categoryServices.getCategory(0, 3, categoryId);

      setCategory(new Category(responseCategory.data));

      if (questionId) {
        const response = await questionServices.getQuestion(0, 3, questionId);
        questionData = response.data;

        setOldQuestion(questionData);
        initializeView(questionData);
      }

      setQuestion(new Question(questionData));
    };

    fetchQuestion();
  }, []);


  useEffect(() => {
    if (category) {
      setBreadcrumb([
        {
          name: 'Categorías',
          route: '/',
        },
        {
          name: `Categoría ${category.position}: ${category.name}`,
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
    }
  }, [category]);

  useEffect(() => {
    updateAction();
  }, [inputValues]);

  const initializeView = (data) => {
    setInputValues({
      statementImageInput: data.permalink,
      statementInput: data.statement,
      answersInput: data.answers,
      feedbackInput: data.feedback,
    });
  }

  /*useEffect(() => {
    async function fetchCategory() {
      const response = await categoryServices.getCategory(0, categoryId);

      setCategory(new Category(response.data));
    };

    fetchCategory();
  }, [id]);*/

  const onStatementImageChange = (e) => {
    const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
    const inputValue = e.target.value;

    if (urlImageRegex.test(inputValue) || !inputValue) {
      const newQuestion = new Question({ ...question, permalink: inputValue });
      setQuestion(newQuestion);
    }

    setInputValues({ ...inputValues, statementImageInput: inputValue });
  }

  const updateAction = () => {
    setAction({
      name: `Guardar ${ questionId ? ' cambios' : '' }`,
      icon: faFloppyDisk,
      onActionClick: onSaveQuestionClick,
    });
  }

  const onSaveQuestionClick = async() => {
    const newInflatedFeedback = feedbackInput.type !== 'no-feedback' ? new InflatedFeedback({
      ...feedbackInput.inflatedFeedback,
      id: oldQuestion?.feedback?.inflatedFeedback?.id || null,
    }) : null;
    const newInflatedIncorrectFeedback = feedbackInput.type === 'variable-feedback' ? new InflatedFeedback({
      ...feedbackInput.inflatedIncorrectFeedback,
      id: oldQuestion?.feedback?.inflatedIncorrectFeedback?.id || null,
    }) : null;
    const newFeedback = new Feedback({
      id: oldQuestion?.feedback?.id || null,
      type: feedbackInput.type,
      inflatedFeedback: newInflatedFeedback,
      inflatedIncorrectFeedback: newInflatedIncorrectFeedback,
    });
    const newQuestion = new Question({
      id: oldQuestion?.id || null,
      statement: statementInput,
      answers: answersInput,
      feedback: newFeedback,
      permalink: question.permalink,
      categoryId,
    });

    console.log("pregunta");
    console.log(newQuestion);

    if(questionId) {
      await questionServices.updateQuestion(0, 3, newQuestion)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/category/${categoryId}`);
        }
      });
    } else {
      await questionServices.createQuestion(0, 3, newQuestion)
    .then((res) => {
      if (res.status === 200) {
        navigate(`/category/${categoryId}`);
      }
    });
    }
  };

  return (
    <>
        <div className="question-container">
        <QuestionDetailTabs
              activeTab={activeTab}
              onTabClick={onTabClick}
    />
    { activeTab === 0 && <Card className="statement-section">
    <div className="statement-container">
    <QuestionScreen question={question} inputValues={inputValues} setInputValues={setInputValues} />
    
    <div className='image-input-container'>
    <TextField id="statement-image-input" label="Imágen de enunciado (opcional)" variant="outlined"
          type="url"
          value={statementImageInput}
          onChange={onStatementImageChange}
          className="image-statement-input"/>
    </div>
          </div>
    </Card>
    }

    { activeTab === 1 && <div className="question-card">

    <FeedbackEdition inputValues={inputValues} setInputValues={setInputValues}/>
    </div>}
    
    </div>
    </>
  );
}

export default QuestionForm;