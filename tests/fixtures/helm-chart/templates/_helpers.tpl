{{- define "library-fixture.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "library-fixture.labels" -}}
app.kubernetes.io/name: {{ include "library-fixture.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end }}

{{- define "library-fixture.selectorLabels" -}}
app.kubernetes.io/name: {{ include "library-fixture.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
