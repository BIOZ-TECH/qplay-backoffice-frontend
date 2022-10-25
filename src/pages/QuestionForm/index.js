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
import QuestionValidator from "../../validators/entity/QuestionValidator";
import InflatedFeedbackValidator from "../../validators/entity/InflatedFeedbackValidator";
import AnswerValidator from "../../validators/entity/AnswerValidator";

const QuestionForm = ({ setBreadcrumb, setAction, setMessage }) => {
  const { id: questionId, categoryId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [statementType, setStatementType] = useState("only-text");
  const [statementImage, setStatementImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
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

      try {
        const responseCategory = await categoryServices.getCategory(0, 3, categoryId);

        switch(responseCategory.status) {
          case 200:
            setCategory(new Category(responseCategory.data));
  
            if (questionId) {
              const response = await questionServices.getQuestion(0, 3, questionId);
  
              switch(response.status) {
                case 200:
                  questionData = response.data;
      
                  setOldQuestion(questionData);
                  initializeView(questionData);
                  break;
                default:
                  navigate('/error-500');
              }
            }
      
            setQuestion(new Question(questionData));
  
            break;
          default:
            navigate('/error-500');
        }
      } catch (e) {
        switch(e.response.status) {
          case 400:
          case 401:
            navigate('/error-401');
            break;
          case 404:
            navigate('/error-404');
            break;
          default:
            navigate('/error-500');
        }
      }
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

  const onStatementImageChange = (e) => {
    const urlImageRegex = new RegExp('http(s)?://.*\.(jpg|jpeg|png|gif)');
    const inputValue = e.target.value;

    if (urlImageRegex.test(inputValue) || !inputValue) {
      const newQuestion = new Question({ ...question, permalink: inputValue });
      setQuestion(newQuestion);
    }

    setInputValues({ ...inputValues, statementImageInput: inputValue });
    setErrorMessages({
      ...errorMessages,
      permalink: null,
    });
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

    const questionValidator = new QuestionValidator(newQuestion);

    let newMessages = questionValidator.validate();

    const firstAnswerValidator = answersInput[0] ? new AnswerValidator(answersInput[0]) : null;
    const secondAnswerValidator = answersInput[1] ? new AnswerValidator(answersInput[1]) : null;
    const thirdAnswerValidator = answersInput[2] ? new AnswerValidator(answersInput[2]) : null;
    const fourthAnswerValidator = answersInput[3] ? new AnswerValidator(answersInput[3]) : null;

    newMessages = {
      ...newMessages,
      firstAnswer: firstAnswerValidator ? firstAnswerValidator.validate() : {},
      secondAnswer: secondAnswerValidator ? secondAnswerValidator.validate() : {},
      thirdAnswer: thirdAnswerValidator ? thirdAnswerValidator.validate() : {},
      fourthAnswer: fourthAnswerValidator ? fourthAnswerValidator.validate() : {},
    };

    const inflatedFeedbackValidator = newInflatedFeedback ? new InflatedFeedbackValidator(newInflatedFeedback) : null;
    const inflatedIncorrectFeedbackValidator = newInflatedIncorrectFeedback ? new InflatedFeedbackValidator(newInflatedIncorrectFeedback) : null;
    newMessages = {
      ...newMessages,
      inflatedFeedback: inflatedFeedbackValidator ? inflatedFeedbackValidator.validate() : {},
      inflatedIncorrectFeedback: inflatedIncorrectFeedbackValidator ? inflatedIncorrectFeedbackValidator.validate() : {},
    };

    setErrorMessages(newMessages);


    if (Object.keys(newMessages).length === 0) {
      if(questionId) {
        await questionServices.updateQuestion(0, 3, newQuestion)
        .then((res) => {
          switch(res.status) {
            case 200:
              setMessage({
                severity: 'success',
                text: 'La pregunta ha sido actualizada correctamente'
              });
              navigate(`/category/${categoryId}`);
              break;
            default:
              navigate('/error-500');
          }
        })
        .catch((e) => {
          switch(e.response.status) {
            case 400:
            case 401:
              navigate('/error-401');
              break;
            case 404:
              navigate('/error-404');
              break;
            default:
              navigate('/error-500');
          }
        });
      } else {
        await questionServices.createQuestion(0, 3, newQuestion)
      .then((res) => {
        switch(res.status) {
          case 200:
            setMessage({
              severity: 'success',
              text: 'La pregunta ha sido creada correctamente'
            });
            navigate(`/category/${categoryId}`);
            break;
          default:
            navigate('/error-500');
        }
      })
      .catch((e) => {
        switch(e.response.status) {
          case 400:
          case 401:
            navigate('/error-401');
            break;
          case 404:
            navigate('/error-404');
            break;
          default:
            navigate('/error-500');
        }
      });
      }
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
    <QuestionScreen question={question} inputValues={inputValues} setInputValues={setInputValues}
    errorMessages={errorMessages} setErrorMessages={setErrorMessages}
    />
    
    <div className='image-input-container'>
    <TextField id="statement-image-input" label="Imágen de enunciado (opcional)" variant="outlined"
          type="url"
          value={statementImageInput}
          errorMessages={errorMessages} setErrorMessages={setErrorMessages}
          onChange={onStatementImageChange}
          error={!!errorMessages.permalink}
          helperText={errorMessages.permalink}
          className="image-statement-input"/>
    </div>
          </div>
    </Card>
    }

    { activeTab === 1 && <div className="question-card">

    <FeedbackEdition inputValues={inputValues} setInputValues={setInputValues}
    errorMessages={errorMessages} setErrorMessages={setErrorMessages}/>
    </div>}
    
    </div>
    </>
  );
}

export default QuestionForm;