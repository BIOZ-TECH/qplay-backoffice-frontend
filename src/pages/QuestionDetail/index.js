import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import FeedbackPreview from "./FeedbackPreview";
import QuestionDetailTabs from "./QuestionDetailTabs";
import QuestionScreen from "./QuestionScreen";
import Category from "../../entities/Category";
import Question from "../../entities/Question";
import categoryServices from "../../services/category";
import questionServices from "../../services/question";

const QuestionDetail = ({ setBreadcrumb, setAction }) => {
  const { id: questionId, categoryId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryResponse = await categoryServices.getCategory(categoryId);
  
        switch(categoryResponse.status) {
          case 200:
            setCategory(new Category(categoryResponse.data));

            const response = await questionServices.getQuestion(questionId);

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

      <>
      {
        question
        && (
          <>
                {
        activeTab === 0
        && (
          <Card className="question-detail-card">
          <QuestionScreen question={question}/>
          </Card>
        )
      }
      { activeTab === 1
        && (
          <div className="question-data-container">
          {
            (!question.feedback || question.feedback?.type === 'no-feedback')
            && <Card className='feedback-detail-card'>
              <h1>No posee feedbacks</h1>
            </Card>
          }
          {
              question.feedback?.type !== 'no-feedback'
              && (
                <Card className="feedback-detail-card">
                  <div className="feedback-detail">
                  <div className={`feedback-type ${question.feedback.type === 'variable-feedback' ? 'left': ''}`}>
                  <FeedbackPreview inflatedFeedback={question.feedback.inflatedFeedback} feedbackResultType={question.feedback.type === 'variable-feedback' ? 'correct': 'any'}/>
                  </div>
                  {
                    question.feedback.type === 'variable-feedback' && question.feedback.inflatedIncorrectFeedback
                    && (
                      <div className="feedback-type right">
                      <FeedbackPreview inflatedFeedback={question.feedback.inflatedIncorrectFeedback} feedbackResultType="incorrect"/>
                      </div>
                    )
                  }
                  </div>
                </Card>
              )
          }
          </div>
        )
      }
          </>
        )
      }
      </>
    
    </div>
  );
}

export default QuestionDetail;
