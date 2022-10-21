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

const QuestionDetail = ({ setBreadcrumb, setAction }) => {
  const { id: questionId, categoryId } = useParams();

  const [question, setQuestion] = useState(new Question({
    id: questionId,
    statement: '¿Esta es la pregunta?',
    answers: [
        'Si',
        'No',
        'No sé',
        'Quizás',
    ],
    feedback: new Feedback({
        id: 1,
        type: "variable-feedback",
        inflatedFeedback: new InflatedFeedback({
            id: 1,
            statement: "Este es el feedback correcto",
            videoPermalink: null,
            imagePermalink: "https://c.tenor.com/o4YZm_o1fRwAAAAC/hiii.gif",
        }),
        inflatedIncorrectFeedback: new InflatedFeedback({
            id: 2,
            statement: "Este es el feedback incorrecto",
            videoPermalink: "https://www.youtube.com/watch?v=W-TE_Ys4iwM&list=RDW-TE_Ys4iwM&index=2",
            imagePermalink: null,
        }),
    }),
    image: null
  }));
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setBreadcrumb([
      {
        name: 'Categorías',
        route: '/',
      },
      {
        name: 'Categoría 1: Categoria nombre',
        route: `/category/${categoryId}`,
      },
      {
        name: 'Pregunta',
        route: '',
      },
    ]);
    setAction({
      name: 'Editar pregunta',
      icon: faPencil,
      onActionClick: onEditQuestionClick,
    });
  }, []);

  /*useEffect(() => {
    async function fetchCategory() {
      const response = await categoryServices.getCategory(0, categoryId);

      setCategory(new Category(response.data));
    };

    fetchCategory();
  }, [id]);*/

  const onTabClick = (event, newValue) => {
    setActiveTab(newValue);
  };

  const onSaveQuestionClick = () => {
    
  };

  const onEditQuestionClick = () => {

  }

  return (
        <div className="question-detail-container">
        {/*<p><a>Categoría: Esta es la categoría</a> {'>'} Pregunta</p>
          <button className="edit-question-btn" type="button" onClick={onEditQuestionClick}>
      <FontAwesomeIcon className="mr-2" icon={faPencil} />
        Editar pregunta
  </button>-*/}
    <QuestionDetailTabs
          activeTab={activeTab}
          onTabClick={onTabClick}
    />
    <Card className="question-detail-card">
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
    </Card>
    
    </div>
  );
}

export default QuestionDetail;
