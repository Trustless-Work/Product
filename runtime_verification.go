//go:build runtime_verification

package main

import (
	"fmt"
	"os"
	"time"
)

// RuntimeVerifier implements runtime verification for invariant checking.
type RuntimeVerifier struct {
	invariants   []Invariant
	lastCheckTime time.Time
	violations   []Violation
}

// Invariant represents a property that must hold at all times.
type Invariant struct {
	Name        string
	Description string
	Check       func() bool
}

// Violation represents an invariant violation.
type Violation struct {
	InvarintName string
	Message      string
	Timestamp    time.Time
	StackTrace   string
}

// NewRuntimeVerifier creates a new runtime verifier.
func NewRuntimeVerifier() *RuntimeVerifier {
	return &RuntimeVerifier{
		invariants: make([]Invariant, 0),
		violations: make([]Violation, 0),
	}
}

// AddInvariant registers a new invariant to be checked.
func (rv *RuntimeVerifier) AddInvariant(inv Invariant) {
	rv.invariants = append(rv.invariants, inv)
}

// CheckAll runs all invariants and returns violations.
func (rv *RuntimeVerifier) CheckAll() []Violation {
	var violations []Violation
	for _, inv := range rv.invariants {
		if !inv.Check() {
			violation := Violation{
				InvarintName: inv.Name,
				Message:      fmt.Sprintf("Invariant '%s' violated: %s", inv.Name, inv.Description),
				Timestamp:    time.Now(),
				StackTrace:   getStackTrace(2),
			}
			violations = append(violations, violation)
			rv.violations = append(rv.violations, violation)
		}
	}
	rv.lastCheckTime = time.Now()
	return violations
}

// GetViolations returns all recorded violations.
func (rv *RuntimeVerifier) GetViolations() []Violation {
	return rv.violations
}

// Report generates a verification report.
func (rv *RuntimeVerifier) Report() (string, error) {
	violations := rv.CheckAll()
	report := fmt.Sprintf("Runtime Verification Report\n")
	report += fmt.Sprintf("========================\n")
	report += fmt.Sprintf("Generated: %s\n", time.Now().Format(time.RFC3339))
	report += fmt.Sprintf("Invariants checked: %d\n", len(rv.invariants))
	report += fmt.Sprintf("Violations found: %d\n", len(violations))
	report += "\n"
	for _, v := range violations {
		report += fmt.Sprintf("[VIOLATION] %s\n  Message: %s\n  Time: %s\n\n", v.InvarintName, v.Message, v.Timestamp.Format(time.RFC3339))
	}
	return report, nil
}

func getStackTrace(skip int) string {
	buf := make([]byte, 4096)
	n := runtime.Stack(buf, false)
	return string(buf[:n])
}

// CheckFunction preconditions is a decorator that checks preconditions at runtime.
func CheckFunction(preconditions []func(...interface{}) bool, fn interface{}) interface{} {
	return func(args ...interface{}) (interface{}, error) {
		for _, pc := range preconditions {
			if !pc(args...) {
				return nil, fmt.Errorf("precondition failed")
			}
		}
		// Execute the original function via reflection
		v := reflect.ValueOf(fn)
		results := v.CallSlice([]reflect.Value{reflect.ValueOf(args)})
		if len(results) == 0 {
			return nil, nil
		}
		return results[0].Interface(), results[1].Interface()
	}
}
