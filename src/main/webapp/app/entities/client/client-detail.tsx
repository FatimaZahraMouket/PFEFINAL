import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './client.reducer';

export const ClientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const clientEntity = useAppSelector(state => state.client.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="clientDetailsHeading">
          <Translate contentKey="faeApp.client.detail.title">Client</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{clientEntity.id}</dd>
          <dt>
            <span id="cin">
              <Translate contentKey="faeApp.client.cin">Cin</Translate>
            </span>
          </dt>
          <dd>{clientEntity.cin}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="faeApp.client.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {clientEntity.photo ? (
              <div>
                {clientEntity.photoContentType ? (
                  <a onClick={openFile(clientEntity.photoContentType, clientEntity.photo)}>
                    <img src={`data:${clientEntity.photoContentType};base64,${clientEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {clientEntity.photoContentType}, {byteSize(clientEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="numeroTelephone">
              <Translate contentKey="faeApp.client.numeroTelephone">Numero Telephone</Translate>
            </span>
          </dt>
          <dd>{clientEntity.numeroTelephone}</dd>
          <dt>
            <span id="dateNaissance">
              <Translate contentKey="faeApp.client.dateNaissance">Date Naissance</Translate>
            </span>
          </dt>
          <dd>
            {clientEntity.dateNaissance ? (
              <TextFormat value={clientEntity.dateNaissance} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="nationalite">
              <Translate contentKey="faeApp.client.nationalite">Nationalite</Translate>
            </span>
          </dt>
          <dd>{clientEntity.nationalite}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="faeApp.client.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{clientEntity.adresse}</dd>
          <dt>
            <span id="genre">
              <Translate contentKey="faeApp.client.genre">Genre</Translate>
            </span>
          </dt>
          <dd>{clientEntity.genre}</dd>
          <dt>
            <Translate contentKey="faeApp.client.user">User</Translate>
          </dt>
          <dd>{clientEntity.user ? clientEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/client" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/client/${clientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClientDetail;
