import React, { useEffect, useState } from "react";

import "./styles.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import QuestionScreen from "./QuestionScreen";
import Question from "../../entities/Question";
import FeedbackPreview from "./FeedbackPreview";
import Feedback from "../../entities/Feedback";
import InflatedFeedback from "../../entities/InflatedFeedback";
import QuestionDetailTabs from "./QuestionDetailTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import questionServices from "../../services/question";

import categoryService from "../../services/category";
import Category from "../../entities/Category";

const QuestionDetail = ({ setBreadcrumb, setAction }) => {
  const { id: questionId, categoryId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryResponse = await categoryService.getCategory(0, 3, categoryId);
  
        switch(categoryResponse.status) {
          case 200:
            setCategory(new Category(categoryResponse.data));

            const response = await questionServices.getQuestion(0, 3, questionId);

            switch(response.status) {
              case 200:
                setQuestion(new Question(response.data));
                break;
              default:
                navigate('/error-500');
            }
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

    fetchData();
  }, []);

  useEffect(() => {
    if (!category) return;
    setBreadcrumb([
      {
        name: 'Categorías',
        route: '/',
      },
      {
        name: `Categoría ${category.position}: ${category.name}`,
        route: `/category/${categoryId}`,
      },
      {
        name: 'Pregunta',
      },
    ]);
    setAction({
      name: 'Editar pregunta',
      icon: faPencil,
      onActionClick: onEditQuestionClick,
    });
  }, [category]);

  const onTabClick = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onEditQuestionClick = () => {
    navigate(`/category/${categoryId}/question/edit/${questionId}`)
  }

  return (
        <div className="question-detail-container">
    <QuestionDetailTabs
          activeTab={activeTab}
          onTabClick={onTabClick}
    />
    <Card className="question-detail-card">
      <>
      {
        question
        && (
          <>
                {
        activeTab === 0
        && (
          <QuestionScreen question={question}/>
        )
      }
      { activeTab === 1
        && (
          <div className="question-data-container">
          {
              question.feedback?.type !== 'no-feedback'
              && (
                <>
                  <FeedbackPreview inflatedFeedback={question.feedback.inflatedFeedback} feedbackResultType={question.feedback.type === 'variable-feedback' ? 'correct': 'any'}/>
                  {
                    question.feedback.type === 'variable-feedback' && question.feedback.inflatedIncorrectFeedback
                    && (
                      <FeedbackPreview inflatedFeedback={question.feedback.inflatedIncorrectFeedback} feedbackResultType="incorrect"/>
                    )
                  }
                </>
              )
          }
          </div>
        )
      }
          </>
        )
      }
      </>
    </Card>
    
    </div>
  );
}

export default QuestionDetail;
