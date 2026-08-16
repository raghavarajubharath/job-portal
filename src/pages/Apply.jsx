import { useReducer, useId } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { Loader, ErrorState } from '../components/BoardStates';
import BoardingPass from '../components/BoardingPass';

const initialState = {
  values: { name: '', email: '', phone: '', resumeLink: '', coverLetter: '' },
  errors: {},
  submitted: false,
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your full name.';

  if (!values.email.trim()) {
    errors.email = 'Enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Enter a phone number.';
  } else if (!/^[0-9+\-\s]{7,15}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (values.resumeLink.trim() && !/^https?:\/\/.+/i.test(values.resumeLink)) {
    errors.resumeLink = 'Link should start with http:// or https://';
  }

  if (!values.coverLetter.trim()) {
    errors.coverLetter = 'Tell us briefly why you\u2019re a fit.';
  } else if (values.coverLetter.trim().length < 30) {
    errors.coverLetter = 'A few more words would help \u2014 at least 30 characters.';
  }

  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case 'submit_attempt': {
      const errors = validate(state.values);
      const hasErrors = Object.keys(errors).length > 0;
      return { ...state, errors, submitted: hasErrors ? false : state.submitted };
    }
    case 'submit_success':
      return { ...state, submitted: true };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export default function Apply() {
  const { id } = useParams();
  const { jobs, status, error } = useJobs();
  const [state, dispatch] = useReducer(reducer, initialState);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const resumeId = useId();
  const coverId = useId();

  if (status === 'loading') return <div className="container"><Loader label="Loading application" /></div>;
  if (status === 'error') return <div className="container"><ErrorState message={error} /></div>;

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container job-details-missing">
        <p className="eyebrow">Gate not found</p>
        <h1 className="section-title">We can't find that role anymore.</h1>
        <Link to="/jobs" className="btn btn-primary">
          Back to all jobs
        </Link>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(state.values);
    dispatch({ type: 'submit_attempt' });
    if (Object.keys(errors).length === 0) {
      dispatch({ type: 'submit_success' });
    }
  }

  if (state.submitted) {
    return (
      <div className="container apply-confirmation">
        <p className="eyebrow">Boarding pass issued</p>
        <h1 className="section-title">You're checked in.</h1>
        <p className="board-state-message">
          We'll reach out at <strong>{state.values.email}</strong> if there's a match.
        </p>

        <BoardingPass job={job} applicantName={state.values.name} />

        <div className="apply-confirmation-actions">
          <Link to={`/jobs/${job.id}`} className="btn btn-outline">
            Back to role
          </Link>
          <Link to="/jobs" className="btn btn-primary">
            Browse more jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container apply-page">
      <p className="eyebrow">Applying to Gate {job.gate}</p>
      <h1 className="section-title">{job.title}</h1>
      <p className="apply-subtitle">{job.company} · {job.location}</p>

      <form className="apply-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor={nameId}>Full name</label>
          <input
            id={nameId}
            type="text"
            value={state.values.name}
            onChange={(e) => dispatch({ type: 'change', field: 'name', value: e.target.value })}
            aria-invalid={Boolean(state.errors.name)}
            aria-describedby={state.errors.name ? `${nameId}-error` : undefined}
          />
          {state.errors.name && <p id={`${nameId}-error`} className="field-error">{state.errors.name}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            type="email"
            value={state.values.email}
            onChange={(e) => dispatch({ type: 'change', field: 'email', value: e.target.value })}
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={state.errors.email ? `${emailId}-error` : undefined}
          />
          {state.errors.email && <p id={`${emailId}-error`} className="field-error">{state.errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={phoneId}>Phone number</label>
          <input
            id={phoneId}
            type="tel"
            value={state.values.phone}
            onChange={(e) => dispatch({ type: 'change', field: 'phone', value: e.target.value })}
            aria-invalid={Boolean(state.errors.phone)}
            aria-describedby={state.errors.phone ? `${phoneId}-error` : undefined}
          />
          {state.errors.phone && <p id={`${phoneId}-error`} className="field-error">{state.errors.phone}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={resumeId}>Resume link <span className="field-optional">(optional)</span></label>
          <input
            id={resumeId}
            type="url"
            placeholder="https://…"
            value={state.values.resumeLink}
            onChange={(e) => dispatch({ type: 'change', field: 'resumeLink', value: e.target.value })}
            aria-invalid={Boolean(state.errors.resumeLink)}
            aria-describedby={state.errors.resumeLink ? `${resumeId}-error` : undefined}
          />
          {state.errors.resumeLink && <p id={`${resumeId}-error`} className="field-error">{state.errors.resumeLink}</p>}
        </div>

        <div className="form-field">
          <label htmlFor={coverId}>Why you're a fit</label>
          <textarea
            id={coverId}
            rows={5}
            value={state.values.coverLetter}
            onChange={(e) => dispatch({ type: 'change', field: 'coverLetter', value: e.target.value })}
            aria-invalid={Boolean(state.errors.coverLetter)}
            aria-describedby={state.errors.coverLetter ? `${coverId}-error` : undefined}
          />
          {state.errors.coverLetter && <p id={`${coverId}-error`} className="field-error">{state.errors.coverLetter}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit application
        </button>
      </form>
    </div>
  );
}
